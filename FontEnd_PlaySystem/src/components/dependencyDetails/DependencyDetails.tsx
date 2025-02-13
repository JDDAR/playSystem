import React from "react";
import { Tienda } from "../../models/dependency.model";

import "./dependecyDetails.scss";

interface TiendaDetailsProps {
  tienda: Tienda;
}

const DependencyDetails: React.FC<TiendaDetailsProps> = ({ tienda }) => {
  return (
    <div className="containerDetails">
      <div className="containerDetails_img">
        <figure>
          <img />
        </figure>
        <p>
          <strong>{tienda.numLocal}</strong>
          <span>N° Local</span>
        </p>
      </div>
      <div className="containerDetails_infoDetails">
        <div className="containerDetails_infoDetails_header">
          <p>
            <strong>{tienda.puntoVenta}</strong>
            <span>Punto de venta</span>
          </p>
          <p>
            <strong>{tienda.ciudad}</strong>
            <span>ciudad</span>
          </p>
        </div>
        <h4>Ubicación</h4>
        <div className="containerDetails_infoDetails_location">
          <p>
            <strong>{tienda.direccion}</strong>
            <span>Dirección</span>
          </p>
          <p>
            <strong>{tienda.tels}</strong>
            <span>Telefono</span>
          </p>
          <p>
            <strong>{tienda.horario}</strong>
            <span>Horario</span>
          </p>
          <p>
            <strong>{tienda.region}</strong>
            <span>Región</span>
          </p>
          <p>
            <strong>{tienda.envio}</strong>
            <span>Envio</span>
          </p>
        </div>

        <h4>Características técnicas</h4>
        <div className="containerDetails_infoDetails_features">
          <p>
            <strong>{tienda.area}</strong>
            <span>Area</span>
          </p>
          <p>
            <strong>{tienda.tamanoTienda}</strong>
            <span>Tamaño Tienda</span>
          </p>
          <p>
            <strong>{tienda.antenas}</strong>
            <span>Antenas</span>
          </p>
          <p>
            <strong>{tienda.parqueadero}</strong>
            <span>Parqueadero</span>
          </p>
        </div>

        <h4>Publicidad</h4>
        <div className="containerDetails_infoDetails_publicidad">
          <p>
            <strong>{tienda.banderinesExternos}</strong>
            <span>Banderines</span>
          </p>
          <p>
            <strong>{tienda.cabezotes}</strong>
            <span>Cabezotes</span>
          </p>
          <p>
            <strong>{tienda.cenefa}</strong>
            <span>Cenefa</span>
          </p>
          <p>
            <strong>{tienda.prioridad}</strong>
            <span>Prioridad</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DependencyDetails;
