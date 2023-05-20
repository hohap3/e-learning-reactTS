import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Pagination } from "@mui/material";
import { Table } from "antd";
import userApi from "api/userAPI";
import { useAppDispatch, useAppSelector } from "app/hooks";
import axios, { AxiosError } from "axios";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import { GROUP_LIST } from "constants/common";
import { ChangeEvent, useEffect, useState } from "react";
import {
  URLSearchParamsInit,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  selectUserFilter,
  selectUserPagination,
  selectUserPaginationMapList,
  userAction,
} from "redux/User/userSlice";
import Swal from "sweetalert2";
import { ToastType } from "../../../constants";
import { ListParams, UserListPaginationMap } from "../../../models";
import { toastMessage } from "../../../utils";
import NotFoundAdminTable from "./NotFoundAdminTable/NotFoundAdminTable";

const { Column, ColumnGroup } = Table;

interface Props {
  group: string | null;
}

function AdminUserListTable({ group }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userPaginationMap = useAppSelector(selectUserPaginationMapList);
  const userPagination = useAppSelector(selectUserPagination);
  const userFilter = useAppSelector(selectUserFilter);
  const [filter, setFilter] = useState<ListParams>({
    ...userFilter,
    MaNhom: group ? group : "",
  });
  const [searchParams, setSearchParams] = useSearchParams({
    page: `${userFilter.page ?? 1}`,
    group,
  } as URLSearchParamsInit);

  // move to user list page if group is null or empty
  useEffect(() => {
    if (!group) navigate("/admin/user-list");
    else
      setSearchParams({
        group,
        page: `${searchParams.get("page") ?? 1}`,
      });
  }, []);

  useEffect(() => {
    if (!group) return;
    dispatch(userAction.fetchUserPagination(filter));

    return () => {
      dispatch(userAction.resetUserPagination());
    };
  }, [filter]);

  function handleChangePage(event: ChangeEvent<unknown>, page: number): void {
    setSearchParams({ group: `${group}`, page: `${page}` });
    setFilter({ ...userFilter, page });
  }

  // Not found group page
  if (group && !GROUP_LIST.find((groupItem) => groupItem.value === group)) {
    return <NotFoundAdminTable />;
  }

  function handleRemoveUser(account: string) {
    if (!account) return;
    Swal.fire({
      title: `Are you sure to remove user account "${account}"`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove user!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await userApi.removeUserByAccount(account);

          const successMessage = toastMessage(res, ToastType.SUCCESS);
          successMessage();

          dispatch(userAction.fetchUserPagination({ ...filter }));

          Swal.fire("Removed!", `${res}`, "success");
        } catch (error: any | AxiosError) {
          if (axios.isAxiosError(error)) {
            const failedMessage = toastMessage(
              error.response?.data,
              ToastType.ERROR
            );
            failedMessage();

            Swal.fire({
              icon: "error",
              title: `Oops... Can't remove user account "${account}"`,
              text: `${error.response?.data}`,
            });
          }
        }
      }
    });
  }

  if (userPaginationMap.length < 1) return <LoadingCircle />;

  return (
    <div className="mt-8">
      <div className="mb-6">
        <Button
          onClick={() => navigate("/admin/user-list")}
          variant="outlined"
          className="flex gap-4"
        >
          <ArrowBackIcon />
          Go back to user group page
        </Button>
      </div>

      <Table dataSource={userPaginationMap} pagination={false}>
        <Column title="Account" dataIndex="taiKhoan" key="taiKhoan"></Column>
        <Column title="Name" dataIndex="hoTen" key="hoTen"></Column>
        <Column title="Phone" dataIndex="soDT" key="soDT"></Column>
        <Column title="Email" dataIndex="email" key="email"></Column>
        <Column
          title="User Type"
          dataIndex="maLoaiNguoiDung"
          key="maLoaiNguoiDung"
        ></Column>
        <Column
          title="Action"
          key="action"
          render={(_: any, record: UserListPaginationMap) => {
            return (
              <div className="flex items-center gap-4">
                <button className="py-1 px-4 rounded-md bg-green-500 text-white">
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveUser(record.taiKhoan)}
                  className="py-1 px-4 rounded-md bg-red-500 text-white"
                >
                  Remove
                </button>
              </div>
            );
          }}
        ></Column>
      </Table>

      <div className="my-10 flex justify-center">
        <Pagination
          count={userPagination.totalPages}
          variant="outlined"
          shape="rounded"
          page={
            Number(searchParams.get("page")) > 0
              ? Number(searchParams.get("page"))
              : 1
          }
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default AdminUserListTable;
