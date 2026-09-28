import React from "react";
import PendienteCard from "./PendienteCard";

const ListaPendientes = ({
  pendientes,
  onCompletado,
  onChange,
  onSubmit,
  pendienteEditando,
  pendienteEditForm,
  onEditar,
  onEliminar,
  onCancelar,
}) => {
  return (
    <ul className="flex flex-col gap-3">
      {pendientes.map((pendiente) => (
        <PendienteCard
          key={pendiente.id}
          pendiente={pendiente}
          onCompletado={onCompletado}
          onChange={onChange}
          onSubmit={onSubmit}
          onEditar={onEditar}
          onEliminar={onEliminar}
          onCancelar={onCancelar}
          pendienteEditando={pendienteEditando}
          pendienteEditForm={pendienteEditForm}
        />
      ))}
    </ul>
  );
};

export default ListaPendientes;
