import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../utilities";
import { useDispatch } from "react-redux";
import { resetUser, UserKey } from "../../features/user/userSlice";
import { PublicRoutes } from "../../router/routes";

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
