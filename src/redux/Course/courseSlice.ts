import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Category, CourseItem, ListParams, Pagination } from "../../models";
import { categoryImage } from "constants/common";

export interface CourseState {
  loading: boolean;
  categoryList: Category[];
  courseListByCategory: CourseItem[];
  filter: ListParams;
  pagination: Pagination;
  popularCourseList: CourseItem[];
  selectCourseItem: Partial<CourseItem>;
}

const initialState: CourseState = {
  loading: false,
  categoryList: [],
  courseListByCategory: [],
  filter: {},
  pagination: {},
  popularCourseList: [],
  selectCourseItem: {},
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

// reducers
const courseReducer = courseSlice.reducer;
export default courseReducer;