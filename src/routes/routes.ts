import CourseItemPage from "pages/CourseItemPage";
import { Route } from "../models";
import HomePage from "pages/HomePage";
import MainPage from "pages/MainPage";
import RegisterPage from "pages/RegisterPage";
import SignIn from "pages/SignInPage";
import CourseListPage from "pages/CourseListPage";
import PersonalPage from "pages/PersonalPage";
import RegisterCoursePage from "pages/RegisteredCoursePage";
import PersonalMainPage from "pages/PersonalMainPage";
import AboutPage from "pages/AboutPage";
import ContactPage from "pages/ContactPage";
import CoursePage from "pages/CoursePage";
import AdminMainPage from "pages/admin/AdminMainPage";
import AdminHomePage from "pages/admin/AdminHomePage";
import AdminInfoPage from "pages/admin/AdminInfoPage";

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
