import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Category, CourseItem, User } from "../../models";
import { RootState } from "app/store";
import { getMultipleRandom } from "../../utils";

export interface StatisticDashboard {
  studentList: User[];
  teacherList: User[];
  courseList: CourseItem[];
  categoryList: Category[];
}

export interface DashboardState {
  loading: boolean;
  statisticInfo: StatisticDashboard;
}

const initialState: DashboardState = {
  loading: false,
  statisticInfo: {
    studentList: [],
    teacherList: [],
    courseList: [],
    categoryList: [],
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },

    fetchDataSuccess(state) {
      state.loading = false;
    },

    fetchDataFailed(state) {
      state.loading = false;
    },

    insertStudentList(state, action: PayloadAction<User[]>) {
      state.statisticInfo.studentList = action.payload;
    },

    insertTeacherList(state, action: PayloadAction<User[]>) {
      state.statisticInfo.teacherList = action.payload;
    },

    insertCourseList(state, action: PayloadAction<CourseItem[]>) {
      state.statisticInfo.courseList = action.payload;
    },

    insertCategoryList(state, action: PayloadAction<Category[]>) {
      state.statisticInfo.categoryList = action.payload;
    },

    resetAllData(state) {
      state.loading = false;
      state.statisticInfo = {
        studentList: [],
        teacherList: [],
        courseList: [],
        categoryList: [],
      };
    },
  },
});

// Action
export const dashboardAction = dashboardSlice.actions;

// Selector

export const selectDashboardStudentList = (state: RootState) =>
  state.dashboard.statisticInfo.studentList;
export const selectDashboardTeacherList = (state: RootState) =>
  state.dashboard.statisticInfo.teacherList;
export const selectDashboardCategoryList = (state: RootState) =>
  state.dashboard.statisticInfo.categoryList;
export const selectDashboardCourseList = (state: RootState) =>
  state.dashboard.statisticInfo.courseList;

export const selectDashboardPopularCourses = createSelector(
  selectDashboardCourseList,
  (courseList) => getMultipleRandom(courseList, 25)
);

// reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
