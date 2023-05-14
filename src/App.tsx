import userApi from "api/userAPI";
import { useAppDispatch } from "app/hooks";
import {
  CourseItem,
  CourseItemRegister,
  ListResponseAccount,
  Status,
} from "./models";

import NotFound from "pages/NotFound";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { userAction } from "redux/User/userSlice";
import { clientRoute, personalRoute } from "routes/routes";
import courseAPI from "api/courseAPI";
import { COURSE_GROUP } from "constants/common";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await userApi.getUserInfo();
        const res2: CourseItem[] = await courseAPI.getAllCourse({
          MaNhom: COURSE_GROUP,
        });

        const { matKhau, chiTietKhoaHocGhiDanh, ...restProps } = res;
        const courseListUserRegisterd = res2.filter((course) =>
          chiTietKhoaHocGhiDanh.some((x) => x.maKhoaHoc === course.maKhoaHoc)
        );

        dispatch(
          userAction.fetchLoginSuccess({
            chiTietKhoaHocGhiDanh: courseListUserRegisterd,
            ...restProps,
          })
        );
      } catch (error: any) {
        const { status } = error.response;
        if (status === Status.UNAUTHORIZED) return;
      }
    })();
  }, []);

  return (
    <>
      <Routes>
        {clientRoute.map(({ path, component: Component, children }, idx) => (
          <Route key={idx} path={path} element={<Component />}>
            {children?.map(
              ({ path, index, component: ChildComponent }, idx) => {
                return (
                  <Route
                    path={path}
                    key={idx}
                    index={index}
                    element={<ChildComponent />}
                  ></Route>
                );
              }
            )}
          </Route>
        ))}
        {personalRoute.map(({ path, component: Component, children }, idx) => {
          return (
            <Route key={idx} path={path} element={<Component />}>
              {children?.map(({ path, component: ChildComponent }, idx) => (
                <Route
                  key={idx}
                  path={path}
                  element={<ChildComponent />}
                ></Route>
              ))}
            </Route>
          );
        })}

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
