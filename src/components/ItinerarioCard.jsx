import React from "react";
import { Edit, Trash } from "lucide-react";
import FormularioItinerario from "./FormularioItinerario";

const categoriaColor = {
  Restaurante: "bg-amber-500/10 text-amber-400",
  Lugares: "bg-indigo-500/10 text-indigo-400",
  Tienda: "bg-emerald-500/10 text-emerald-400",
  Otro: "bg-slate-700 text-slate-300",
};

const ItinerarioCard = ({
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
  const estaEditando = itinerario.id === itinerarioEditando;
  return (
    <li className="rounded-lg border border-slate-800 bg-slate-800/30 p-4 transition-colors hover:border-slate-700">
      {estaEditando ? (
        <FormularioItinerario
          values={itinerarioEditForm}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancelar={onCancelar}
          textoSubmit="Guardar cambios"
        />
      ) : (
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <input
              type="checkbox"
              checked={itinerario.completado}
              onChange={() => onCompletar(itinerario.id)}
              className="mt-1 h-4 w-4 shrink-0 accent-indigo-600"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p
                  className={`truncate font-medium ${itinerario.completado ? "text-slate-500 line-through" : "text-slate-100"}`}
                >
                  {itinerario.lugar}
                </p>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs ${categoriaColor[itinerario.categoria] ?? "bg-slate-700 text-slate-300"}`}
                >
                  {itinerario.categoria}
                </span>
              </div>
              {itinerario.direccion && (
                <p className="mt-1 text-sm text-slate-400">
                  {itinerario.direccion}
                </p>
              )}
              {itinerario.nota && (
                <p className="mt-1 text-sm text-slate-500">
                  {itinerario.nota}
                </p>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Edit
              onClick={() => onEditar(itinerario)}
              className="h-4 w-4 cursor-pointer text-slate-500 hover:text-slate-300"
            />
            <Trash
              onClick={() => onEliminar(itinerario.id)}
              className="h-4 w-4 cursor-pointer text-slate-500 hover:text-red-400"
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default ItinerarioCard;
