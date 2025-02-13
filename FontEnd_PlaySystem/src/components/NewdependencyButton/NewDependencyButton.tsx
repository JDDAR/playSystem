import { useState } from "react";
import "./newDependencyButton.scss";
interface NewDependencyButtonProps {
  idClient: string;
  onTiendaAdded?: () => void; //notificar que se agregó una tienda
}

const NewdependencyButton = ({
  idClient,
  onTiendaAdded,
}: NewDependencyButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("ID del Cliente:", idClient);
    handleCloseModal();
    if (onTiendaAdded) onTiendaAdded(); // Notificar que se agregó una tienda
  };

  return (
    <>
      <button onClick={handleOpenModal} className="new-tienda-button">
        Nueva Tienda
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar Nueva Tienda</h2>
            <p>ID del Cliente: {idClient}</p> {/* Mostrar el idClient */}
            <form onSubmit={handleSubmit}>
              {/* Aquí irán los campos del formulario */}
              <button type="submit">Agregar</button>
              <button type="button" onClick={handleCloseModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewdependencyButton;
