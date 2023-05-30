import errorResponsive from "assets/notFound/error-4a19709e.png";
import { ADMIN_TOKEN, IS_ADMIN } from "constants/common";
import AdminCommonLayout from "layouts/admin/adminCommonLayout/AdminCommonLayout";
import AdminHeader from "layouts/admin/adminHeader/AdminHeader";
import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getLocalStorageData } from "../../utils";

function AdminMainPage() {
  const accessToken = getLocalStorageData(ADMIN_TOKEN) ?? null;
  const isAdmin = getLocalStorageData(IS_ADMIN) ?? null;
  const timeIntervalId = useRef<null | number>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken && !isAdmin) {
      Swal.fire({
        title: "You need to log in and you must be an admin!",
        html: "Will return to homepage after <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const element = Swal.getHtmlContainer()?.querySelector("b");
          timeIntervalId.current = setInterval(() => {
            if (element) element.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          if (timeIntervalId.current) clearInterval(timeIntervalId.current);
          navigate("/");
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          navigate("/");
        }
      });
    }
  }, []);

  return (
    <section>
      <div className="bg-[#000033] min-h-screen hidden xl:block">
        <div className="container mx-auto">
          <AdminHeader />
          <AdminCommonLayout children={<Outlet />} />
        </div>
      </div>

      <div className="xl:hidden block bg-white relative w=full min-h-screen max-h-screen">
        <div>
          <img src={errorResponsive} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="py-4 px-6 bg-red-700 rounded-md text-white text-[18px] capitalize font-bold">
            Sorry, admin dashboard is not supported for handheld devices!
          </p>
        </div>
      </div>
    </section>
  );
}

export default AdminMainPage;
