import { UserInfoDetail } from "models/index";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { TextField } from "@mui/material";
import UserInfoCompSkeleton from "./UserInfoCompSkeleton";

interface Props {
  user: UserInfoDetail | null;
  isLoading: boolean;
}

function UserInfoComp({ user, isLoading }: Props) {
  if (!user || isLoading) return <UserInfoCompSkeleton />;

  const { hoTen, maLoaiNguoiDung, email, taiKhoan, tenLoaiNguoiDung } = user;

  return (
    <section className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <AccountCircleIcon sx={{ fontSize: "18rem" }} />
      </div>
      <div className="col-span-4">
        <div className="p-6 bg-[#15395a] text-white rounded-md mb-4">
          <h2 className="text-2xl font-semibold">{hoTen}</h2>
          <p className="text-[#ceaa4d]">{maLoaiNguoiDung}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            Email:
            <TextField
              fullWidth
              value={email}
              size="small"
              variant="standard"
              disabled
            />
          </div>

          <div className="flex gap-4 items-center">
            Account:
            <TextField
              fullWidth
              value={taiKhoan}
              size="small"
              variant="standard"
              disabled
            />
          </div>

          <div className="flex gap-4 items-center">
            User Type:
            <TextField
              fullWidth
              value={tenLoaiNguoiDung}
              size="small"
              variant="standard"
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserInfoComp;
