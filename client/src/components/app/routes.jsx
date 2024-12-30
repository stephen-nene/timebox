// routes.js
import { lazy } from "react";

// Lazy-loaded components
const DashboardRoutes = {
  Home: lazy(() => import("../pages/dashboard/HomeDash")),
  Scholarships: lazy(() => import("../pages/dashboard/Scholarships")),
  Users: lazy(() => import("../pages/dashboard/Users")),
  AllFinances: lazy(() => import("../pages/dashboard/AllFinances")),
  Categories: lazy(() => import("../pages/dashboard/Categories")),
};

const AuthRoutes = {
  Login: lazy(() => import("../pages/auth/Login")),
  Forgot: lazy(() => import("../pages/auth/Forgot")),
  Register: lazy(() => import("../pages/auth/Register")),
  Activate: lazy(() => import("../pages/auth/Activate")),
  Reset: lazy(() => import("../pages/auth/Reset")),
};

// Eager-loaded components
import { Home } from "../pages/Home";
import { Profiles } from "../pages/Profiles";
import TomeBox from "../pages/TimeBox.jsx";
import Contact from "../pages/Contact";
import Error404 from "../pages/utils/Error404";

// Route configurations
export const routeConfig = [
  // Public Routes
  { path: "/", element: Home },
  { path: "/login", element: AuthRoutes.Login },
  { path: "/register", element: AuthRoutes.Register },
  { path: "/forgot", element: AuthRoutes.Forgot },
  { path: "/activate/:token", element: AuthRoutes.Activate },
  { path: "/reset/:token", element: AuthRoutes.Reset },
  { path: "/contact", element: Contact },

  // Protected Routes
  {
    path: "/profile",
    element: Profiles,
    protected: true,
    allowPendingAccess: true,
  },

  {
    path: "/timebox",
    element: TomeBox,
    // protected: true,
    // allowPendingAccess: false,
  },
  {
    path: "/finances/new",
    element: lazy(() => import("../pages/NewFinance")),
    protected: true,
    roles: ["admin", "user"],
  },

  // Dashboard Routes
  {
    path: "/dash",
    element: DashboardRoutes.Home,
    protected: true,
  },
  {
    path: "/dash/categories",
    element: DashboardRoutes.Categories,
    protected: true,
    roles: ["admin"],
  },
  {
    path: "/dash/finances",
    element: DashboardRoutes.AllFinances,
    protected: true,
    roles: ["admin"],
  },
  {
    path: "/dash/users",
    element: DashboardRoutes.Users,
    protected: true,
    roles: ["admin"],
  },

  // 404 Route
  { path: "*", element: Error404 },
];

// Loading fallback component
export const LoadingFallback = () => (
  <div className="w-full max-w-md mx-auto animate-pulse p-9">
    <h1 className="h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600"></h1>
    <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    <p className="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
  </div>
);
