import { useAppSelector } from "app/hooks";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { selectLoginInfo } from "redux/User/userSlice";
import { personalRoute } from "routes/routes";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function Personal() {
  return (
    <div className="h-full">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-3 lg:col-span-2">
          <div className="border-2 border-r-2 border-t-0 border-l-0 border-b-0 h-full">
            <nav>
              <NavLink
                to="/personal-info/home"
                className={({ isActive, isPending }) => {
                  const commonClass = `flex gap-2 text-[#333] hover:text-[#333]  hover:bg-[#e8e8e8] px-4 py-2 transition-colors text-ms lg:text-base`;
                  return isActive
                    ? `${commonClass} bg-[#e8e8e8]`
                    : `${commonClass} bg-transparent`;
                }}
              >
                <div className="hidden md:block">
                  <InfoOutlinedIcon />
                </div>
                Your Personal's Info
              </NavLink>
              <NavLink
                to="register-course"
                className={({ isActive, isPending }) => {
                  const commonClass = `flex gap-2 text-[#333] hover:text-[#333]  hover:bg-[#e8e8e8] px-4 py-2 transition-colors`;
                  return isActive
                    ? `${commonClass} bg-[#e8e8e8]`
                    : `${commonClass} bg-transparent`;
                }}
              >
                <div className="hidden md:block">
                  <VpnKeyIcon />
                </div>
                Registered Courses
              </NavLink>
            </nav>
          </div>
        </div>
        <div className="col-span-9 lg:col-span-10">
          <div className="py-2 px-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personal;
