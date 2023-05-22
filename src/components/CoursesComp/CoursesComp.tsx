import React, { useEffect, useState } from "react";
import styles from "./courseComp.module.scss";
import CourseCompList from "components/CourseCompList/CourseCompList";
import {
  courseAction,
  selectFilter,
  selectPagination,
} from "redux/Course/courseSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Pagination } from "@mui/material";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import SearchComp from "components/searchCourse/SearchCourse";
import { ListParams } from "models/index";

function CoursesComp() {
  const filter = useAppSelector(selectFilter);
  const pagination = useAppSelector(selectPagination);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState<ListParams>({
    ...filter,
    page: Number(searchParams.get("page")) || 1,
  });

  const dispatch = useAppDispatch();

  function handleChangePage(
    event: React.ChangeEvent<unknown>,
    page: number
  ): void {
    setFilterParams((prevState) => ({ ...prevState, page }));
    setSearchParams((prevParams) => ({ ...prevParams, page }));
  }

  useEffect(() => {
    setSearchParams({
      page: `${searchParams.get("page") ?? 1}`,
      courseSearch: `${searchParams.get("courseSearch") ?? ""}`,
    });
  }, []);

  useEffect(() => {
    dispatch(
      courseAction.fetchCourseListPagination({
        ...filterParams,
        page: Number(searchParams.get("page")),
        tenKhoaHoc: `${searchParams.get("courseSearch") ?? ""}`,
      })
    );
  }, [filterParams]);

  function handleSearchCourse(searchValue: string) {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page: 1,
      courseSearch: searchValue,
    }));
    setFilterParams((prevState) => ({ ...prevState, tenKhoaHoc: searchValue }));
  }

  return (
    <section className={`${styles["courses"]}`}>
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="uppercase text-4xl"> Course List </h2>
        </div>

        <div className={`${styles["courses-container"]} px-4 lg:px-0`}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <div className={`${styles["courses-item"]}`}>
                <SearchComp
                  onSearchChange={handleSearchCourse}
                  placeholder="Search Course"
                  searchParamsValue="courseSearch"
                />

                <CourseCompList />

                <div className="mt-10 flex justify-center">
                  <Pagination
                    onChange={handleChangePage}
                    count={pagination.totalPages}
                    page={Number(searchParams.get("page"))}
                    shape="rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoursesComp;
