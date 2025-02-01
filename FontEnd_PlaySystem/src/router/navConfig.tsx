import { lazy } from "react";
import { PrivateRoutes } from "./routes";

import { FaHome, FaUsers, FaShoppingCart } from "react-icons/fa";

export type NavItem = {
  path: string;
  label: string;
  icon: JSX.Element;
  component: ReturnType<typeof lazy>;
};

export const NavConfig: Record<string, NavItem[]> = {
  ADMINISTRATOR: [
    {
      path: PrivateRoutes.ADMINDASHBOARD,
      label: "Inicio",
      icon: <FaHome />,
      component: lazy(
        () => import("../pages/Dashboard/AdminDashboard/AdminHome"),
      ),
    },
    {
      path: PrivateRoutes.ADMINDASHBOARD,
      label: "Usuarios",
      icon: <FaUsers />,
      component: lazy(
        () => import("../pages/Dashboard/AdminDashboard/AdminUsers.tsx"),
      ),
    },
    {
      path: PrivateRoutes.ADMINDASHBOARD,
      label: "Ordenes",
      icon: <FaShoppingCart />,
      component: lazy(
        () => import("../pages/Dashboard/AdminDashboard/AdminOrder"),
      ),
    },
  ],
};
