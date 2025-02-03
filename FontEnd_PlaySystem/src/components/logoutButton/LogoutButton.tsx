import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearLocalStorage } from "../../app/hooks";
import { resetUser, UserKey } from "../../features/user";
import { PublicRoutes } from "../../config/routes";

const LogoutBotton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LogOut = () => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });

    window.location.reload();
  };

  return (
    <>
      <button onClick={LogOut}>Cerrar Sesión</button>
    </>
  );
};

export default LogoutBotton;
