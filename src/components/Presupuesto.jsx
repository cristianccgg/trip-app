import React from "react";

const Presupuesto = ({ values, onChange }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-100">Presupuesto</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="orlando" className="text-sm text-slate-400">
            Orlando
          </label>
          <input
            value={values.orlando}
            name="orlando"
            onChange={onChange}
            type="number"
            id="orlando"
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="newYork" className="text-sm text-slate-400">
            New York
          </label>
          <input
            value={values.newYork}
            onChange={onChange}
            name="newYork"
            type="number"
            id="newYork"
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="total" className="text-sm text-slate-400">
            Total
          </label>
          <input
            value={values.total}
            onChange={onChange}
            name="total"
            type="number"
            id="total"
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Presupuesto;
