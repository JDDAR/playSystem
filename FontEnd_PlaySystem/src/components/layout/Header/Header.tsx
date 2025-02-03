import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";

import "./header.scss";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../app/store";
import NavConfig from "../../../app/router/NavConfig";

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigationItem = NavConfig[user.role] || [];

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

      <nav className="containerHeader__NavHeader">
        {navigationItem.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

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
