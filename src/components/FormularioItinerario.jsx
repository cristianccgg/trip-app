import React from "react";
import { categoriasItinerario } from "../constants";

const FormularioItinerario = ({
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
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="lugar" className="text-sm font-medium text-slate-300">
          Lugar
        </label>
        <input
          name="lugar"
          value={values.lugar}
          onChange={onChange}
          id="lugar"
          type="text"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="categoria"
          className="text-sm font-medium text-slate-300"
        >
          Categoria
        </label>
        <select
          name="categoria"
          value={values.categoria}
          onChange={onChange}
          id="categoria"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        >
          <option value="">Categoria</option>
          {categoriasItinerario.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 sm:col-span-3">
        <label
          htmlFor="direccion"
          className="text-sm font-medium text-slate-300"
        >
          Direccion
        </label>
        <input
          name="direccion"
          value={values.direccion}
          onChange={onChange}
          id="direccion"
          type="text"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1 sm:col-span-3">
        <label htmlFor="nota" className="text-sm font-medium text-slate-300">
          Nota
        </label>
        <textarea
          name="nota"
          value={values.nota}
          onChange={onChange}
          id="nota"
          rows={2}
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        ></textarea>
      </div>
      <div className="flex gap-3 sm:col-span-3">
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600"
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          {textoSubmit}
        </button>
      </div>
    </form>
  );
};

export default FormularioItinerario;
