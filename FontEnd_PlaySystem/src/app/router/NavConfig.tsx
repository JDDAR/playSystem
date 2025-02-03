import { lazy } from "react";
import { FaHome, FaUsers, FaShoppingCart } from "react-icons/fa";
import { PrivateRoutes } from "../../config/routes";

export type NavItem = {
  path: string;
  label: string;
  icon: JSX.Element;
  component: ReturnType<typeof lazy>;
};

const NavConfig: Record<string, NavItem[]> = {
  ADMINISTRATOR: [
    {
      path: `${PrivateRoutes.ADMINDASHBOARD}/home`,
      label: "Inicio",
      icon: <FaHome />,
      component: lazy(
        () => import("../../pages/dashboard/AdminDashboard/AdminHome.tsx"),
      ),
    },
    {
      path: `${PrivateRoutes.ADMINDASHBOARD}/users`,
      label: "Usuarios",
      icon: <FaUsers />,
      component: lazy(
        () => import("../../pages/dashboard/AdminDashboard/AdminUsers"),
      ),
    },
    {
      path: `${PrivateRoutes.ADMINDASHBOARD}/orders`,
      label: "Órdenes",
      icon: <FaShoppingCart />,
      component: lazy(
        () => import("../../pages/dashboard/AdminDashboard/AdminOrder"),
      ),
    },
  ],
};

export default NavConfig;
