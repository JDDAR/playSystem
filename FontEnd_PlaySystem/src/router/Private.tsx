import { Navigate, Route } from "react-router-dom";
import { lazy } from "react";
import { RouterWithNotFound } from "../utilities";
import { RoleGuard } from "../components/Auth";
import { PrivateRoutes } from "./routes";
import ManagerDashboard from "../pages/Dashboard/ManagerDashboard";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const AdminDashboard = lazy(() => import("../pages/Dashboard/AdminDashboard"));
const ClientDashboard = lazy(
  () => import("../pages/Dashboard/ClientDashboard"),
);

function Private() {
  return (
    <RouterWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
      <Route
        path={PrivateRoutes.ADMINDASHBOARD}
        element={
          <RoleGuard rol="ADMINISTRATOR">
            <AdminDashboard />
          </RoleGuard>
        }
      />
      <Route
        path={PrivateRoutes.CLIENTDASHBOARD}
        element={
          <RoleGuard rol="CLIENT">
            <ClientDashboard />
          </RoleGuard>
        }
      />
      <Route
        path={PrivateRoutes.MANAGERDASHBOARD}
        element={
          <RoleGuard rol="MANAGER">
            <ManagerDashboard />
          </RoleGuard>
        }
      />
    </RouterWithNotFound>
  );
}

export default Private;
