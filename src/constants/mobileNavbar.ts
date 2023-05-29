import { MobileNavbar } from "models/index";
import HouseIcon from "@mui/icons-material/House";
import InfoIcon from "@mui/icons-material/Info";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CallIcon from "@mui/icons-material/Call";

export const mobileNavbarList: MobileNavbar[] = [
  {
    title: "Home",
    path: "/",
    icon: HouseIcon,
  },

  {
    title: "About",
    path: "/about",
    icon: InfoIcon,
  },

  {
    title: "Courses",
    path: "/courses",
    icon: FormatListBulletedIcon,
  },

  {
    title: "Contact",
    path: "/contact",
    icon: CallIcon,
  },
];
