import { useAppDispatch, useAppSelector } from "app/hooks";
import { GROUP_LIST } from "constants/common";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  selectUserPagination,
  selectUserPaginationMapList,
  userAction,
} from "redux/User/userSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;

interface Props {
  group: string | null;
}

function AdminUserListTable({ group }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userPaginationMap = useAppSelector(selectUserPaginationMapList);

  // move to user list page if group is null or empty
  useEffect(() => {
    if (!group) navigate("/admin/user-list");
  }, []);

  useEffect(() => {
    if (!group) return;
    dispatch(
      userAction.fetchUserPagination({ MaNhom: group, page: 1, pageSize: 10 })
    );

    return () => {
      dispatch(userAction.resetUserPagination());
    };
  }, [dispatch]);

  // Not found group page
  if (group && !GROUP_LIST.find((groupItem) => groupItem.value === group)) {
    return (
      <div>
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          className="flex gap-4"
        >
          <ArrowBackIcon />
          Go back to previous page
        </Button>
        <h2 className="mt-8">Not found group</h2>
      </div>
    );
  }

  // taiKhoan: user.taiKhoan,
  // hoTen: user.hoTen,
  // soDT: user.soDT,
  // email: user.email,
  // maLoaiNguoiDung: user.maLoaiNguoiDung,

  return (
    <div className="mt-8">
      <Table dataSource={userPaginationMap}>
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
          render={(_: any, record: any) => (
            <div className="flex items-center gap-4">
              <button className="ant-btn ant-btn-link">Edit</button>
              <button>Remove</button>
            </div>
          )}
        ></Column>
      </Table>
    </div>
  );
}

export default AdminUserListTable;
