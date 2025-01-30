import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import UserDropdown from "./UserDropdown";

import "./header.scss";

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //Obteber iniciales del usuario
  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "--";
  };

  return (
    <header className="containerHeader">
      <h3>SystemPlay</h3>
      <div className="containerHeader__UserProfile">
        <div className="containerHeader__UserProfile__Name">
          <h4>{user.userName || "Usuario"}</h4>
          <p>{user.role || "Sin Rol"}</p>
        </div>

        <div
          className="containerHeader__Avatar"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {user.image ? (
            <img src={user.image} alt="User Avatar" />
          ) : (
            <span>{getInitials(user.userName)}</span>
          )}
        </div>
        {dropdownOpen && <UserDropdown />}
      </div>
    </header>
  );
};

export default Header;
