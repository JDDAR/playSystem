import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStore } from "../../store/store";
import { PrivateRoutes } from "../../router/routes";

interface RoleGuardProps {
  rol: string; // Rol requerido para esta ruta
  children: ReactNode; // Contenido a renderizar si el rol coincide
}

export const RoleGuard = ({ rol, children }: RoleGuardProps) => {
  const userState = useSelector((store: AppStore) => store.user);

  return userState.user && userState.user.role === rol ? (
    <>{children}</>
  ) : (
    <Navigate replace to={PrivateRoutes.PRIVATE} />
  );
};
export default RoleGuard;
