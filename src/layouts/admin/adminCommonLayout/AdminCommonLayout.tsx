import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HouseIcon from "@mui/icons-material/House";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import SettingsIcon from "@mui/icons-material/Settings";
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

interface OpenList {
  openAccount: boolean;
  openUserList: boolean;
  openCourseList: boolean;
  openSetting: boolean;
}

function AdminCommonLayout({ children }: Props) {
  const [
    { openAccount, openUserList, openCourseList, openSetting },
    setOpenList,
  ] = useState<OpenList>({
    openAccount: false,
    openUserList: false,
    openCourseList: false,
    openSetting: false,
  });
  const loginInfo = useAppSelector(selectLoginInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { hoTen } = loginInfo;

  function handleClick(name: string) {
    setOpenList((prevState) => {
      return { ...prevState, [name]: !prevState[name as keyof OpenList] };
    });
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
                <ListItemButton onClick={() => handleClick("openAccount")}>
                  <ListItemIcon>
                    <AccountBoxIcon sx={{ color: "#fff", fontSize: "2rem" }} />
                  </ListItemIcon>
                  <ListItemText primary={`${hoTen}`} />
                  {openAccount ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse in={openAccount} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <NavLink
                      to="/admin/information"
                      className="text-white hover:text-white"
                    >
                      <ListItemButton sx={{ pl: 4, pb: 2 }}>
                        <NavLink
                          to="/admin/information"
                          className={({ isActive, isPending }) => {
                            const commonClass = `flex-1 text-white hover:text-white flex items-center gap-1`;

                            return isActive
                              ? `bg-[#000033] ${commonClass}`
                              : commonClass;
                          }}
                        >
                          <ListItemIcon>
                            <PersonIcon
                              sx={{ color: "#fff", fontSize: "2rem" }}
                            />
                          </ListItemIcon>
                          <ListItemText primary="User's Information" />
                        </NavLink>
                      </ListItemButton>
                    </NavLink>

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
              <div className="border border-1 border-gray-800">
                <NavLink
                  to="/admin/home"
                  className={({ isActive, isPending }) => {
                    const commonClass = `text-white hover:text-white flex items-center gap-4 p-2`;

                    return isActive
                      ? `bg-[#000033] ${commonClass}`
                      : commonClass;
                  }}
                >
                  <HouseIcon sx={{ fontSize: "2rem" }} />
                  Home Page
                </NavLink>

                <div>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: "100%",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton onClick={() => handleClick("openUserList")}>
                      <ListItemIcon>
                        <ManageAccountsIcon
                          sx={{ color: "#fff", fontSize: "2rem" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={`User Manager`} />
                      {openUserList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                    <Collapse in={openUserList} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <NavLink
                          to="/admin/user-list"
                          className={({ isActive, isPending }) => {
                            const commonClass = `flex-1 text-white hover:text-white flex items-center gap-1`;

                            return isActive
                              ? `bg-[#000033] ${commonClass}`
                              : commonClass;
                          }}
                        >
                          <ListItemButton sx={{ pl: 4, pb: 2 }}>
                            <ListItemText primary="User List" />
                          </ListItemButton>
                        </NavLink>

                        <NavLink
                          to="/admin/add-user"
                          className={({ isActive, isPending }) => {
                            const commonClass = `flex-1 text-white hover:text-white flex items-center gap-1`;

                            return isActive
                              ? `bg-[#000033] ${commonClass}`
                              : commonClass;
                          }}
                        >
                          <ListItemButton sx={{ pl: 4, pb: 2 }}>
                            <ListItemText primary="Add New User" />
                          </ListItemButton>
                        </NavLink>
                      </List>
                    </Collapse>
                  </List>
                </div>

                <div>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: "100%",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton
                      onClick={() => handleClick("openCourseList")}
                    >
                      <ListItemIcon>
                        <LaptopChromebookIcon
                          sx={{ color: "#fff", fontSize: "2rem" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={`Course Manager`} />
                      {openCourseList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                    <Collapse in={openCourseList} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4, pb: 2 }}>
                          <ListItemText primary="Course List" />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 4, pb: 2 }}>
                          <ListItemText primary="Add New Course" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                </div>

                <div>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: "100%",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton onClick={() => handleClick("openSetting")}>
                      <ListItemIcon>
                        <SettingsIcon
                          sx={{ color: "#fff", fontSize: "2rem" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={`Setting`} />
                      {openSetting ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                    <Collapse in={openSetting} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4, pb: 2 }}>
                          <ListItemText primary="Setting dashboard" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
}

export default AdminCommonLayout;
