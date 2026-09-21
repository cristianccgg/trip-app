import React from "react";
import GastoCard from "./GastoCard";

const ListaGastos = ({
  gastosFiltrados,
  gastoEditando,
  gastoEditForm,
  onChange,
  onEliminar,
  onEditar,
  onSubmit,
  onCancelar,
}) => {
  return (
    <ul className="space-y-3">
      {gastosFiltrados.map((gasto) => (
        <GastoCard
          key={gasto.id}
          gasto={gasto}
          gastoEditando={gastoEditando}
          gastoEditForm={gastoEditForm}
          onChange={onChange}
          onEliminar={onEliminar}
          onEditar={onEditar}
          onSubmit={onSubmit}
          onCancelar={onCancelar}
        />
      ))}
    </ul>
  );
};

export default ListaGastos;
