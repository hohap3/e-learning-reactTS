import { put, takeLatest, all, call } from "redux-saga/effects";
import { dashboardAction } from "./dashboardSlice";
import { Category, CourseItem, ListResponse, User } from "../../models";
import userApi from "api/userAPI";
import courseAPI from "api/courseAPI";
import { COURSE_GROUP } from "constants/common";

function* fetchUserList() {
  const res: User[] = yield call(() => userApi.getUserList());

  // Separate user
  const studentList = res.filter((data) => data.maLoaiNguoiDung === "HV");
  const teacherList = res.filter((data) => data.maLoaiNguoiDung === "GV");

  yield put(dashboardAction.insertTeacherList(teacherList));
  yield put(dashboardAction.insertStudentList(studentList));
}

function* fetchCourseList() {
  const res: CourseItem[] = yield call(() =>
    courseAPI.getAllCourse({
      MaNhom: COURSE_GROUP,
    })
  );

  yield put(dashboardAction.insertCourseList(res));
}

function* fetchCategoryList() {
  const res: Category[] = yield call(() => courseAPI.getAllCourseCategory());

  yield put(dashboardAction.insertCategoryList(res));
}

function* dashboardFetchData() {
  try {
    yield all([
      call(fetchUserList),
      call(fetchCourseList),
      call(fetchCategoryList),
    ]);

    yield put(dashboardAction.fetchDataSuccess());
  } catch (error) {
    console.log(error);
    yield put(dashboardAction.fetchDataFailed());
  }
}

function* dashboardSaga() {
  yield takeLatest(dashboardAction.fetchData.type, dashboardFetchData);
}

export default dashboardSaga;
