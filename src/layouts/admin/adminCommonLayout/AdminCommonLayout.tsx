import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HouseIcon from "@mui/icons-material/House";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { selectLoginInfo, userAction } from "redux/User/userSlice";
import Swal from "sweetalert2";
import { ToastType } from "../../../constants";
import { ACCESS_TOKEN, IS_ADMIN } from "../../../constants/common";
import { getLocalStorageData, toastMessage } from "../../../utils";
import "animate.css";

interface Props {
  children: ReactNode;
}

function AdminCommonLayout({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const loginInfo = useAppSelector(selectLoginInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { hoTen } = loginInfo;

  function handleClick() {
    setOpen((prevState) => !prevState);
  }

  function handleLogout() {
    Swal.fire({
      title: "Do you want to logout?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Logout",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const accessToken = getLocalStorageData(ACCESS_TOKEN);
        if (!accessToken) return;
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(IS_ADMIN);
        dispatch(userAction.logout());

        const successToast = toastMessage(
          "Logout successfully!",
          ToastType.SUCCESS
        );
        successToast();
        navigate("/");
      }
    });
  }

  return (
    <div className="py-5">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <div>
            <div className="text-white bg-[#2b2b4b] mb-5">
              <List
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <AccountBoxIcon sx={{ color: "#fff", fontSize: "2rem" }} />
                  </ListItemIcon>
                  <ListItemText primary={`${hoTen}`} />
                  {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4, pb: 2 }}>
                      <ListItemIcon>
                        <PersonIcon sx={{ color: "#fff", fontSize: "2rem" }} />
                      </ListItemIcon>
                      <ListItemText primary="User's Information" />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ pl: 4, pb: 2 }}
                      onClick={handleLogout}
                    >
                      <ListItemIcon>
                        <LogoutIcon sx={{ color: "#fff", fontSize: "2rem" }} />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </div>

            <div className="text-white bg-[#2b2b4b] mb-5 py-2 px-4">
              <NavLink
                to="/admin/home"
                className={({ isActive, isPending }) => {
                  const commonClass = `text-white hover:text-white flex items-center gap-4 p-2`;

                  return isActive ? `bg-[#000033] ${commonClass}` : commonClass;
                }}
              >
                <HouseIcon sx={{ fontSize: "2rem" }} />
                Home Page
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
}

export default AdminCommonLayout;
