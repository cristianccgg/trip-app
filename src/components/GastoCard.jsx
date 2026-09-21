import React from "react";
import { Edit, Trash } from "lucide-react";

const GastoCard = ({ gasto, onEliminar }) => {
  return (
    <li className="flex items-start justify-between gap-4 rounded-lg border border-slate-800 bg-slate-800/30 p-4 transition-colors hover:border-slate-700">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-slate-100">{gasto.titulo}</p>
          {gasto.categoria && (
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
              {gasto.categoria}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-500">
          {[gasto.fecha, gasto.ciudad, gasto.metodo, gasto.pagador]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {gasto.nota && (
          <p className="mt-1 text-sm italic text-slate-500">{gasto.nota}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <div className="text-right">
          <p
            className={`font-semibold whitespace-nowrap ${gasto.moneda === "USD" ? "text-emerald-400" : "text-indigo-400"}`}
          >
            ${gasto.monto.toLocaleString("en-US")} {gasto.moneda}
          </p>
          {gasto.moneda === "USD" && (
            <p className="text-xs whitespace-nowrap text-slate-500">
              $
              {(gasto.monto * gasto.tasaAldia).toLocaleString("es-CO", {
                maximumFractionDigits: 0,
              })}{" "}
              COP
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Edit className="h-4 w-4 cursor-pointer text-slate-500 hover:text-slate-300" />
          <Trash
            onClick={() => onEliminar(gasto.id)}
            className="h-4 w-4 cursor-pointer text-slate-500 hover:text-red-400"
          />
        </div>
      </div>
    </li>
  );
};

export default GastoCard;
