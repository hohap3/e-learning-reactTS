import AboutPage from "pages/AboutPage";
import ContactPage from "pages/ContactPage";
import CourseItemPage from "pages/CourseItemPage";
import CourseListPage from "pages/CourseListPage";
import CoursePage from "pages/CoursePage";
import HomePage from "pages/HomePage";
import MainPage from "pages/MainPage";
import PersonalMainPage from "pages/PersonalMainPage";
import PersonalPage from "pages/PersonalPage";
import RegisterPage from "pages/RegisterPage";
import RegisterCoursePage from "pages/RegisteredCoursePage";
import SignIn from "pages/SignInPage";
import AdminHomePage from "pages/admin/AdminHomePage";
import AdminInfoPage from "pages/admin/AdminInfoPage";
import AdminMainPage from "pages/admin/AdminMainPage";
import AdminUserListPage from "pages/admin/AdminUserListPage";
import { Route } from "../models";
import AdminAddUserPage from "pages/admin/AdminAddUserPage";
import AdminAddCoursePage from "pages/admin/AdminAddCoursePage";
import AdminCourseListPage from "pages/admin/AdminCourseListPage";
import AdminCourseDetailPage from "pages/admin/AdminCourseDetailPage";
import AdminUserDetailPage from "pages/admin/AdminUserDetailPage";

const clientRoute: Route[] = [
  {
    path: "/",
    component: MainPage,
    children: [
      {
        index: true,
        component: HomePage,
      },
      {
        path: "/about",
        component: AboutPage,
      },
      {
        path: "/signIn",
        name: "Sign In",
        component: SignIn,
      },
      {
        path: "/register",
        name: "Register",
        component: RegisterPage,
      },
      {
        path: "/course-item/:courseId",
        component: CourseItemPage,
      },
      {
        path: "/category/:categoryId",
        component: CourseListPage,
      },
      {
        path: "/contact",
        component: ContactPage,
      },
      {
        path: "/courses",
        component: CoursePage,
      },
    ],
  },
];

export const adminRoutes: Route[] = [
  {
    path: "/admin",
    component: AdminMainPage,
    children: [
      {
        path: "home",
        component: AdminHomePage,
      },
      {
        path: "information",
        component: AdminInfoPage,
      },
      {
        path: "user-list",
        component: AdminUserListPage,
      },
      {
        path: "add-user",
        component: AdminAddUserPage,
      },
      {
        path: "add-course",
        component: AdminAddCoursePage,
      },
      {
        path: "course-list",
        component: AdminCourseListPage,
      },
      {
        path: "course-info/:courseId",
        component: AdminCourseDetailPage,
      },
      {
        path: "user-info/:account",
        component: AdminUserDetailPage,
      },
    ],
  },
];

const personalRoute: Route[] = [
  {
    path: "/personal-info",
    component: PersonalPage,
    children: [
      {
        name: `Personal's Info`,
        path: "home",
        component: PersonalMainPage,
      },
      {
        name: "Registered Courses",
        path: "register-course",
        component: RegisterCoursePage,
      },
    ],
  },
];

export { clientRoute, personalRoute };
