import React from "react";
import GastoCard from "./GastoCard";

const ListaGastos = ({ gastosFiltrados, onEliminar }) => {
  return (
    <ul className="space-y-3">
      {gastosFiltrados.map((gasto) => (
        <GastoCard key={gasto.id} gasto={gasto} onEliminar={onEliminar} />
      ))}
    </ul>
  );
};

export default ListaGastos;
