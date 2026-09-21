import React from "react";
import { ciudades, usuarios, categorias } from "../constants";

const Filtros = ({ filtros, onChange }) => {
  return (
    <section className="flex flex-wrap gap-3">
      <select
        name="ciudad"
        value={filtros.ciudad}
        onChange={onChange}
        className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
      >
        <option value="todas">Ciudad</option>

        {ciudades.map((ciudad) => (
          <option key={ciudad} value={ciudad}>
            {ciudad}
          </option>
        ))}
      </select>
      <select
        name="categoria"
        value={filtros.categoria}
        onChange={onChange}
        className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
      >
        <option value="todas">Categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
      <select
        name="pagador"
        value={filtros.pagador}
        onChange={onChange}
        className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
      >
        <option value="todas">Pagador</option>
        {usuarios.map((usuario) => (
          <option key={usuario} value={usuario}>
            {usuario}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Filtros;
