import { fork, put, all, call, takeLatest, delay } from "redux-saga/effects";
import { courseAction } from "./courseSlice";
import { Category, CourseItem, ListParams, ListResponse } from "../../models";
import courseAPI from "api/courseAPI";
import { getMultipleRandom } from "../../utils";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchCourseCategory() {
  const res: Array<Category> = yield call(() =>
    courseAPI.getAllCourseCategory()
  );

  yield put(courseAction.insertCategoryList(res));
}

function* fetchCourseListPopular() {
  const res: ListResponse<CourseItem> = yield call(() =>
    courseAPI.getCourseListByPage({ page: 1, pageSize: 10 })
  );

  const { items } = res;
  const randomCourseList = getMultipleRandom(items, 3);

  yield put(courseAction.insertPopularCourse(randomCourseList));
}

function* fetchAllCourseAPI() {
  try {
    yield all([call(fetchCourseCategory), call(fetchCourseListPopular)]);

    yield put(courseAction.fetchCourseSuccess());
  } catch (error) {
    console.log(error);
    yield put(courseAction.fetchCourseFailed());
  }
}

function* fetchCourse() {
  yield fork(fetchAllCourseAPI);
}

function* fetchCourseListCategory(action: PayloadAction<string>) {
  try {
    const res: Array<CourseItem> = yield call(() =>
      courseAPI.getCourseByCategory(action.payload)
    );

    yield put(courseAction.fetchCourseListCategorySuccess(res));
  } catch (error) {
    console.log(error);
    yield put(courseAction.fetchCourseListCategoryFailed());
  }
}

function* fetchCourseListByPagination(action: PayloadAction<ListParams>) {
  try {
    yield delay(500);
    const res: ListResponse<CourseItem> = yield call(() =>
      courseAPI.getCourseListByPage(action.payload)
    );

    yield put(courseAction.fetchCourseListPaginationSuccess(res));
    yield put(courseAction.insertFilter(action.payload));
  } catch (error) {
    yield put(courseAction.fetchCourseListPaginationFailed());
  }
}

function* courseSaga() {
  yield takeLatest(courseAction.fetchCourse.type, fetchCourse);
  yield takeLatest(
    courseAction.fetchCourseListCategory.type,
    fetchCourseListCategory
  );
  yield takeLatest(
    courseAction.fetchCourseListPagination.type,
    fetchCourseListByPagination
  );
}

export default courseSaga;
