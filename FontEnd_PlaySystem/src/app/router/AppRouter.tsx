// app/router/AppRouter.tsx
import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PrivateRoutes, PublicRoutes } from "../../config/routes";
import { AuthGuard, RoleGuard } from "../../components/guards";
import { DashboardLayout } from "../../components/layout";
import RoutesWhithNotFound from "../../services/utils/RoutesWithNotFound.tsx";
import AdminUsers from "../../pages/dashboard/AdminDashboard/AdminUsers.tsx";
import AdminOrder from "../../pages/dashboard/AdminDashboard/AdminOrder.tsx";

const Login = lazy(() => import("../../pages/auth/Login"));
const AdminHome = lazy(
  () => import("../../pages/dashboard/AdminDashboard/AdminHome.tsx"),
);

const ManagerDashboard = lazy(
  () => import("../../pages/dashboard/ManagerDashboard"),
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <RoutesWhithNotFound>
          <Route
            path="/"
            element={<Navigate to={`/${PublicRoutes.LOGIN}`} replace />}
          />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path={PrivateRoutes.PRIVATE} element={<DashboardLayout />}>
              <Route
                path="admin/*"
                element={
                  <RoleGuard rol="ADMINISTRATOR">
                    <RoutesWhithNotFound>
                      <Route index element={<AdminHome />} />
                      <Route path="home" element={<AdminHome />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="orders" element={<AdminOrder />} />
                    </RoutesWhithNotFound>
                  </RoleGuard>
                }
              />
              <Route
                path="gerente/*"
                element={
                  <RoleGuard rol="MANAGER">
                    <ManagerDashboard />
                  </RoleGuard>
                }
              />
            </Route>
          </Route>
        </RoutesWhithNotFound>
      </Suspense>
    </BrowserRouter>
  );
};
