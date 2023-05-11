import userApi from "api/userAPI";
import { useAppDispatch } from "app/hooks";
import { CourseItem, ListResponseAccount, Status } from "./models";

import NotFound from "pages/NotFound";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { userAction } from "redux/User/userSlice";
import { clientRoute, personalRoute } from "routes/routes";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res: ListResponseAccount<CourseItem> =
          await userApi.getUserInfo();

        const { matKhau, ...restProps } = res;

        dispatch(userAction.fetchLoginSuccess(restProps));
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
