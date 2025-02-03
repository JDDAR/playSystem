import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./dashboardLayout.scss";

const DashboardLayout = () => {
  return (
    <div>
      <Header />
      <main className="containerContentDashboard">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
