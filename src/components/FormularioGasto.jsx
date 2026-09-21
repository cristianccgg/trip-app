import React from "react";

const categorias = ["Comida", "Transporte", "Alojamiento", "Compras", "Otros"];
const monedas = ["USD", "COP"];
const metodosPago = ["Tarjeta", "Efectivo", "Paypal"];
const usuarios = ["Cristian", "Daniela", "Ambos"];
const ciudades = ["Orlando", "New York", "Bogota"];

const FormularioGasto = ({
  values,
  onChange,
  onSubmit,
  disabled,
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
        <label
          htmlFor="tituloGasto"
          className="text-sm font-medium text-slate-300"
        >
          Gasto
        </label>
        <input
          name="titulo"
          value={values.titulo}
          onChange={onChange}
          id="tituloGasto"
          type="text"
          required
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="fecha" className="text-sm font-medium text-slate-300">
          Fecha
        </label>
        <input
          name="fecha"
          value={values.fecha}
          onChange={onChange}
          id="fecha"
          type="date"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="ciudad" className="text-sm font-medium text-slate-300">
          Ciudad
        </label>
        <select
          name="ciudad"
          id="ciudad"
          value={values.ciudad}
          onChange={onChange}
          required
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        >
          <option value="">Selecciona...</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad} value={ciudad}>
              {ciudad}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="categoria"
          className="text-sm font-medium text-slate-300"
        >
          Categoría
        </label>
        <select
          name="categoria"
          id="categoria"
          value={values.categoria}
          onChange={onChange}
          required
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        >
          <option value="">Selecciona...</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="monto" className="text-sm font-medium text-slate-300">
          Monto
        </label>
        <input
          name="monto"
          value={values.monto}
          onChange={onChange}
          id="monto"
          type="number"
          required
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="moneda" className="text-sm font-medium text-slate-300">
          Moneda
        </label>
        <select
          name="moneda"
          value={values.moneda}
          id="moneda"
          onChange={onChange}
          required
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        >
          <option value="">Selecciona...</option>
          {monedas.map((moneda) => (
            <option key={moneda} value={moneda}>
              {moneda}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="metodo" className="text-sm font-medium text-slate-300">
          Método de pago
        </label>
        <select
          name="metodo"
          id="metodo"
          value={values.metodo}
          onChange={onChange}
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        >
          <option value="">Selecciona...</option>
          {metodosPago.map((metodo) => (
            <option key={metodo} value={metodo}>
              {metodo}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="pagador" className="text-sm font-medium text-slate-300">
          Quién pagó
        </label>
        <select
          name="pagador"
          id="pagador"
          value={values.pagador}
          onChange={onChange}
          required
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        >
          <option value="">Selecciona...</option>
          {usuarios.map((usuario) => (
            <option key={usuario} value={usuario}>
              {usuario}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 sm:col-span-3">
        <label htmlFor="nota" className="text-sm font-medium text-slate-300">
          Nota (opcional)
        </label>
        <textarea
          name="nota"
          value={values.nota}
          onChange={onChange}
          id="nota"
          rows={2}
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
        />
      </div>
      <button
        onClick={onCancelar}
        type="button"
        className="rounded-md bg-indigo-200 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-700 hover:text-white sm:col-span-3"
      >
        Cancelar
      </button>

      <button
        disabled={disabled}
        type="submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:col-span-3"
      >
        {textoSubmit}
      </button>
    </form>
  );
};

export default FormularioGasto;
