import userApi from "api/userAPI";
import { useAppDispatch } from "app/hooks";
import { CourseItem, Status } from "./models";

import NotFound from "pages/NotFound";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { userAction } from "redux/User/userSlice";
import { adminRoutes, clientRoute, personalRoute } from "routes/routes";

import courseAPI from "api/courseAPI";
import { COURSE_GROUP } from "constants/common";
import { fetchCourseRegisterDetail } from "utils/index";

function App() {
  const dispatch = useAppDispatch();

  // call api user right after they access to website
  useEffect(() => {
    (async () => {
      try {
        const result = fetchCourseRegisterDetail();

        result.then((res: any) => {
          const { chiTietKhoaHocGhiDanh, ...restProps } = res;

          dispatch(
            userAction.fetchLoginSuccess({
              chiTietKhoaHocGhiDanh,
              ...restProps,
            })
          );
        });
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

        {adminRoutes.map(({ path, component: Component, children }, idx) => (
          <Route key={idx} path={path} element={<Component />}>
            {children?.map(({ path, component: ChildComponent }, idx) => {
              return (
                <Route
                  key={idx}
                  path={path}
                  element={<ChildComponent />}
                ></Route>
              );
            })}
          </Route>
        ))}

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
