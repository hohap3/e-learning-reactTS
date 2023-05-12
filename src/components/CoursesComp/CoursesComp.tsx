import React, { useEffect } from "react";
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
import SearchCourse from "components/searchCourse/SearchCourse";

function CoursesComp() {
  const filter = useAppSelector(selectFilter);
  const pagination = useAppSelector(selectPagination);
  const [searchParams, setSearchParams] = useSearchParams({
    page: `${filter.page ?? 1}`,
  } as URLSearchParamsInit);

  const dispatch = useAppDispatch();

  function handleChangePage(
    event: React.ChangeEvent<unknown>,
    page: number
  ): void {
    dispatch(courseAction.insertFilter({ ...filter, page }));
    setSearchParams((prevParams) => ({ ...prevParams, page }));
  }

  useEffect(() => {
    dispatch(courseAction.fetchCourseListPagination(filter));
  }, [filter]);

  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page: `${searchParams.get("page") ?? 1}`,
    }));
  }, []);

  function handleSearchCourse(searchValue: string) {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page: `${filter.page ?? 1}`,
      courseSearch: searchValue,
    }));
    dispatch(
      courseAction.insertFilter({ ...filter, tenKhoaHoc: searchValue, page: 1 })
    );
  }

  return (
    <section className={`${styles["courses"]}`}>
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="uppercase text-4xl"> Course List </h2>
        </div>

        <div className={`${styles["courses-container"]}`}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <div className={`${styles["courses-item"]}`}>
                <SearchCourse onSearchChange={handleSearchCourse} />

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
