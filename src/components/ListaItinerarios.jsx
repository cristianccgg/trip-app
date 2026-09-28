import React from "react";
import ItinerarioCard from "./ItinerarioCard";

const ListaItinerarios = ({
  itinerario,
  onEliminar,
  itinerarioEditando,
  itinerarioEditForm,
  onChange,
  onEditar,
  onSubmit,
  onCancelar,
  onCompletar,
}) => {
  return (
    <ul className="flex flex-col gap-3">
      {itinerario.map((item) => (
        <ItinerarioCard
          key={item.id}
          itinerario={item}
          onEliminar={onEliminar}
          itinerarioEditando={itinerarioEditando}
          itinerarioEditForm={itinerarioEditForm}
          onChange={onChange}
          onEditar={onEditar}
          onSubmit={onSubmit}
          onCancelar={onCancelar}
          onCompletar={onCompletar}
        />
      ))}
    </ul>
  );
};

export default ListaItinerarios;
