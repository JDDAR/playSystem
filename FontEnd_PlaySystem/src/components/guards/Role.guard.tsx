import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { PrivateRoutes } from "../../config/routes";

interface RoleGuardProps {
  rol: string; // Rol requerido para esta ruta
  children: ReactNode; // Contenido a renderizar si el rol coincide
}

export const RoleGuard = ({ rol, children }: RoleGuardProps) => {
  const userState = useSelector((store: RootState) => store.user);

  return userState.user && userState.user.role === rol ? (
    <>{children}</>
  ) : (
    <Navigate replace to={PrivateRoutes.PRIVATE} />
  );
};
export default RoleGuard;
