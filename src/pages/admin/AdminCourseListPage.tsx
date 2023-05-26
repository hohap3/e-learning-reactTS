import { Backdrop, Button, Pagination } from "@mui/material";
import { ColumnsType } from "antd/es/table";
import courseAPI from "api/courseAPI";
import { useAppDispatch, useAppSelector } from "app/hooks";

import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import AdminTable from "components/admin/AdminTable/AdminTable";
import { ToastType } from "constants/index";

import { GROUP_LIST } from "constants/common";
import AdminLayoutPage from "layouts/admin/adminLayoutPage/AdminLayoutPage";
import { CourseItem, CourseListMapTable, ListParams } from "models/index";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  courseAction,
  selectCourseList,
  selectCourseListMapTable,
  selectFilter,
  selectPagination,
} from "redux/Course/courseSlice";
import Swal from "sweetalert2";
import {
  getDefaultImagePath,
  limitWordLength,
  toastMessage,
} from "utils/index";
import axios, { AxiosError } from "axios";
import SearchComp from "components/searchCourse/SearchCourse";

function AdminCourseListPage() {
  const courseListMapTable = useAppSelector(selectCourseListMapTable);
  const coursePagination = useAppSelector(selectPagination);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const filter = useAppSelector(selectFilter);
  const [filterParams, setFilterParams] = useState<ListParams>({
    ...filter,
    page: Number(searchParams.get("page")) || 1,
    pageSize: 15,
    MaNhom: `${searchParams.get("group")}`,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // set default url searchpParams
  useEffect(() => {
    if (!searchParams.get("group")) return;
    else
      setSearchParams({
        group: `${searchParams.get("group")}`,
        page: `${searchParams.get("page") ?? 1}`,
        search: `${searchParams.get("search") ?? ""}`,
      });
  }, [searchParams.get("group")]);

  // call api
  useEffect(() => {
    if (!searchParams.get("group")) return;

    dispatch(
      courseAction.fetchCourseListPagination({
        ...filterParams,
        MaNhom: `${searchParams.get("group")}`,
        tenKhoaHoc: `${searchParams.get("search") ?? ""}`,
      })
    );
    return () => {
      dispatch(courseAction.resetCourseListPagination());
    };
  }, [searchParams.get("group"), filterParams]);

  // handle error image
  function handleErrorImage(e: SyntheticEvent<HTMLImageElement, ErrorEvent>) {
    const defaultImagePath = getDefaultImagePath({
      width: 56,
      height: 56,
    });
    if (!e.target) return;
    (e.target as HTMLImageElement).src = defaultImagePath;
  }

  function handleChangePage(e: ChangeEvent<unknown>, page: number) {
    setFilterParams((prevState) => ({ ...prevState, page }));
    setSearchParams({ group: `${searchParams.get("group")}`, page: `${page}` });
  }

  function handleSelectGroup(group: string) {
    setSearchParams({ group });
  }
  function handleEdit(courseItem: CourseListMapTable) {
    console.log(courseItem);
  }

  function handleRemoveCourse(courseItem: CourseListMapTable) {
    if (Object.keys(courseItem).length < 1 || !courseItem) return;
    const { tenKhoaHoc, maKhoaHoc } = courseItem;
    Swal.fire({
      title: `Are you sure to remove course "${tenKhoaHoc}"`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        setTimeout(async () => {
          try {
            const res = await courseAPI.removeCourse(maKhoaHoc);

            const successMessage = toastMessage(res, ToastType.SUCCESS);
            successMessage();

            Swal.fire("Removed!", `${res}`, "success");

            setLoading(false);
          } catch (error: any | AxiosError) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
              const failedMessage = toastMessage(
                error.response?.data,
                ToastType.ERROR
              );
              failedMessage();

              Swal.fire({
                icon: "error",
                title: `Oops... Can't remove course "${tenKhoaHoc}"`,
                text: `${error.response?.data}`,
              });
            }
          }
        }, 500);
      }
    });
  }

  function handleSearch(searchValues: string) {
    setSearchParams({
      group: `${searchParams.get("group")}`,
      page: `1`,
      search: searchValues,
    });
    setFilterParams((prevState) => ({
      ...prevState,
      tenKhoaHoc: searchValues,
      page: 1,
    }));
  }

  const columns: ColumnsType<CourseListMapTable> = [
    { title: "Course Code", dataIndex: "maKhoaHoc", key: "maKhoaHoc" },
    { title: "Course Name", dataIndex: "tenKhoaHoc", key: "tenKhoaHoc" },
    {
      title: "Course Description",
      dataIndex: "moTa",
      key: "moTa",
      render: (text, record, index) => <p>{limitWordLength(text, 30)}</p>,
    },
    {
      title: "Course Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record, index) => (
        <img src={text} className="w-14" onError={handleErrorImage} />
      ),
    },
    { title: "Course Date", dataIndex: "ngayTao", key: "ngayTao" },
    {
      title: "Account Create",
      dataIndex: "taiKhoanNguoiTao",
      key: "taiKhoanNguoiTao",
    },
    {
      title: "Account Category",
      dataIndex: "maDanhMucKhoahoc",
      key: "maDanhMucKhoahoc",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: CourseListMapTable) => {
        return (
          <div className="flex items-center gap-4">
            <button
              title="Show course detail"
              className="py-1 px-4 rounded-md bg-blue-500 text-white"
              onClick={() => navigate(`/admin/course-info/${record.maKhoaHoc}`)}
            >
              Detail
            </button>

            <button
              title="Edit course"
              className="py-1 px-4 rounded-md bg-green-500 text-white"
              onClick={() => handleEdit(record)}
            >
              Edit
            </button>
            <button
              title="Remove course"
              className="py-1 px-4 rounded-md bg-red-500 text-white"
              onClick={() => handleRemoveCourse(record)}
            >
              Remove
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayoutPage
      title={!searchParams.get("group") ? "Select one of groups below" : ""}
    >
      <div className="my-4">
        {!searchParams.get("group") && (
          <div className="grid grid-cols-2 gap-4">
            {GROUP_LIST.map((group) => (
              <div key={group.key} className="col-span-1">
                <button
                  className="h-[4rem] text-[16px] w-full relative border border-[#0868FD] text-black rounded-2xl"
                  onClick={() => handleSelectGroup(group.value)}
                >
                  {group.value}
                </button>
              </div>
            ))}
          </div>
        )}

        {searchParams.get("group") && (
          <>
            <h2 className="capitalize text-2xl text-center mb-6">
              Course List
            </h2>

            <div className="mb-6">
              <Button
                onClick={() => navigate(`/admin/course-list`)}
                variant="outlined"
                className="flex gap-4"
              >
                <ArrowBackIcon />
                Go back to list page
              </Button>
            </div>

            <SearchComp
              placeholder="Search course..."
              searchParamsValue="search"
              onSearchChange={handleSearch}
            />

            <AdminTable
              title=""
              group={`${searchParams.get("group")}`}
              columns={columns}
              dataSource={courseListMapTable}
              enablePagination={false}
            />

            <div className="my-10 flex justify-center">
              <Pagination
                count={coursePagination.totalPages}
                variant="outlined"
                shape="rounded"
                page={Number(searchParams.get("page")) || 1}
                onChange={handleChangePage}
              />
            </div>
          </>
        )}

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <LoadingCircle />
        </Backdrop>
      </div>
    </AdminLayoutPage>
  );
}

export default AdminCourseListPage;
