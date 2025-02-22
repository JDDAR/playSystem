import { useNavigate } from "react-router-dom";

import "./userDropDown.scss";
import { LogoutBotton } from "../../logoutButton";

const UserDropdown: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="containerUserDropDown">
        <ul>
          <li onClick={() => navigate("/perfil")}>Perfil</li>
          <li>
            <LogoutBotton />
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserDropdown;
