import { DynamicHeader } from "../../../components/layout";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../../../features/ui/uiSlice";

import "./adminUsers.scss"; // Reutilizamos estilos de adminUsers
import OrderList from "../../../components/order/OrderList";
import CreateOrderForm from "../../../components/order/CreateOrderForm";

const AdminOrder = () => {
  const dispatch = useDispatch();

  const handleCreateOrder = () => {
    dispatch(
      openModal({
        title: "Crear Nueva Orden",
        message: "",
        variant: "modalForms",
        autoClose: false,
        content: <CreateOrderForm />,
        extraClasses: "modalMedium modalLeft",
      })
    );
  };

  return (
    <div className="containerAdminUsers">
      <DynamicHeader
        title="Proyectos"
      />
      <button onClick={handleCreateOrder} className="create-order-btn">
        Nueva Orden
      </button>
      <OrderList />

    </div>
  );
};

export default AdminOrder;