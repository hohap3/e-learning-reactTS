import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import {
  Category,
  CourseItem,
  ListParams,
  ListResponse,
  Pagination,
  UserHadRegister,
} from "../../models";
import { categoryImage } from "constants/common";

export interface CourseState {
  loading: boolean;
  categoryList: Category[];
  courseListByCategory: CourseItem[];
  filter: ListParams;
  pagination: Pagination;
  popularCourseList: CourseItem[];
  courseList: CourseItem[];
  selectCourseItem: Partial<CourseItem>;
  courseInfo: {
    detail: CourseItem | null;
    studentRegisteredList: UserHadRegister[];
    studentWaitingList: UserHadRegister[];
  };
}

const initialState: CourseState = {
  loading: false,
  categoryList: [],
  courseListByCategory: [],
  filter: {
    page: 1,
    pageSize: 10,
  },
  pagination: {
    currentPage: 1,
    count: 10,
  },
  popularCourseList: [],
  selectCourseItem: {},
  courseList: [],
  courseInfo: {
    detail: null,
    studentRegisteredList: [],
    studentWaitingList: [],
  },
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    fetchCourse(state) {
      state.loading = true;
    },

    fetchCourseSuccess(state) {
      state.loading = false;
    },

    fetchCourseFailed(state) {
      state.loading = false;
    },

    fetchCourseListCategory(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    fetchCourseListPagination(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },

    fetchCourseListPaginationSuccess(
      state,
      action: PayloadAction<ListResponse<CourseItem>>
    ) {
      state.loading = false;
      state.courseList = action.payload.items;
      state.pagination = {
        currentPage: action.payload.currentPage,
        count: action.payload.count,
        totalPages: action.payload.totalPages,
        totalCount: action.payload.totalCount,
      };
    },

    fetchCourseListPaginationFailed(state) {
      state.loading = false;
    },

    insertFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    fetchCourseListCategorySuccess(state, action: PayloadAction<CourseItem[]>) {
      state.loading = false;
      state.courseListByCategory = action.payload;
    },

    fetchCourseListCategoryFailed(state) {
      state.loading = false;
    },

    insertCategoryList(state, action: PayloadAction<Category[]>) {
      state.categoryList = action.payload;
    },

    insertPopularCourse(state, action: PayloadAction<CourseItem[]>) {
      state.popularCourseList = action.payload;
    },

    fetchSelectCourseItem(state, action: PayloadAction<string>) {
      return;
    },

    insertSelectCourseItem(state, action: PayloadAction<CourseItem>) {
      state.selectCourseItem = action.payload;
    },

    fetchCourseInfo(state, action: PayloadAction<string>) {
      state.loading = true;
    },

    insertCourseInfoDetail(state, action: PayloadAction<CourseItem>) {
      state.loading = false;
      state.courseInfo.detail = action.payload;
    },

    insertStudentRegisteredCourse(
      state,
      action: PayloadAction<UserHadRegister[]>
    ) {
      state.loading = false;
      state.courseInfo.studentRegisteredList = action.payload;
    },

    insertStudentWaitingList(state, action: PayloadAction<UserHadRegister[]>) {
      state.loading = false;
      state.courseInfo.studentWaitingList = action.payload;
    },

    fetchCourseInfoFailed(state) {
      state.loading = false;
    },

    startLoading(state) {
      state.loading = true;
    },

    doneLoading(state) {
      state.loading = false;
    },

    resetCourseListCategory(state) {
      state.loading = false;
      state.courseListByCategory = [];
    },

    resetCourseList(state) {
      state.courseList = [];
    },

    resetCourseListPagination(state) {
      state.loading = false;
      state.courseList = [];
      state.filter = {
        page: 1,
        pageSize: 10,
      };
      state.pagination = {
        currentPage: 1,
        count: 10,
      };
    },
  },
});

// actions
export const courseAction = courseSlice.actions;

// selectors
export const selectCategoryList = (state: RootState) =>
  state.course.categoryList;

export const selectCategoryMapList = createSelector(
  selectCategoryList,
  (categoryList) =>
    categoryList.map((category, idx) => ({
      ...category,
      image: categoryImage[idx].image,
    }))
);

export const selectPopularCourseList = (state: RootState) =>
  state.course.popularCourseList;

export const selectLoadingCourse = (state: RootState) => state.course.loading;

export const selectCourseListCategory = (state: RootState) =>
  state.course.courseListByCategory;

export const selectFilter = (state: RootState) => state.course.filter;
export const selectCourseList = (state: RootState) => state.course.courseList;
export const selectPagination = (state: RootState) => state.course.pagination;
export const selectCourseListMapTable = createSelector(
  selectCourseList,
  (courseList) =>
    courseList.map(
      ({
        maKhoaHoc,
        tenKhoaHoc,
        moTa,
        hinhAnh,
        maNhom,
        ngayTao,
        nguoiTao: { taiKhoan },
        danhMucKhoaHoc: { maDanhMucKhoahoc },
      }) => ({
        maKhoaHoc,
        tenKhoaHoc,
        moTa,
        hinhAnh,
        maNhom,
        ngayTao,
        taiKhoan,
        maDanhMucKhoahoc,
      })
    )
);

export const selectCourseInfoDetail = (state: RootState) =>
  state.course.courseInfo.detail;

export const selectUserRegisterList = (state: RootState) =>
  state.course.courseInfo.studentRegisteredList;

export const selectUserWaitingList = (state: RootState) =>
  state.course.courseInfo.studentWaitingList;

// reducers
const courseReducer = courseSlice.reducer;
export default courseReducer;
