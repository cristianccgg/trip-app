import React from "react";
import { prioridades } from "../constants";

const FormularioPendientes = ({
  values,
  onChange,
  onSubmit,
  onCancelar,
  textoSubmit = "Agregar",
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
    >
      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="titulo" className="text-sm text-slate-400">
          Titulo / Descripcion
        </label>
        <input
          name="titulo"
          value={values.titulo}
          onChange={onChange}
          id="titulo"
          type="text"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="prioridad" className="text-sm text-slate-400">
          Prioridad
        </label>
        <select
          value={values.prioridad}
          onChange={onChange}
          name="prioridad"
          id="prioridad"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        >
          {prioridades.map((prioridad) => (
            <option key={prioridad} value={prioridad}>
              {prioridad}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          {textoSubmit}
        </button>
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormularioPendientes;
