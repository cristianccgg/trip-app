import React from "react";
import FormularioPendientes from "./FormularioPendientes";
import { Edit, Trash } from "lucide-react";

const prioridadColor = {
  Alta: "bg-red-500/10 text-red-400",
  Media: "bg-amber-500/10 text-amber-400",
  Baja: "bg-slate-700 text-slate-300",
};

const PendienteCard = ({
  pendiente,
  pendienteEditando,
  pendienteEditForm,
  onCompletado,
  onChange,
  onSubmit,
  onEditar,
  onEliminar,
  onCancelar,
}) => {
  const estaEditando = pendienteEditando === pendiente.id;
  return (
    <li className="rounded-lg border border-slate-800 bg-slate-800/30 p-4 transition-colors hover:border-slate-700">
      {estaEditando ? (
        <FormularioPendientes
          values={pendienteEditForm}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancelar={onCancelar}
          textoSubmit="Guardar cambios"
        />
      ) : (
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <input
              type="checkbox"
              checked={pendiente.completado}
              onChange={() => onCompletado(pendiente.id)}
              className="h-4 w-4 shrink-0 accent-indigo-600"
            />
            <div className="min-w-0">
              <p
                className={`truncate font-medium ${pendiente.completado ? "text-slate-500 line-through" : "text-slate-100"}`}
              >
                {pendiente.titulo}
              </p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${prioridadColor[pendiente.prioridad] ?? "bg-slate-700 text-slate-300"}`}
              >
                {pendiente.prioridad}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Edit
              onClick={() => onEditar(pendiente)}
              className="h-4 w-4 cursor-pointer text-slate-500 hover:text-slate-300"
            />
            <Trash
              onClick={() => onEliminar(pendiente.id)}
              className="h-4 w-4 cursor-pointer text-slate-500 hover:text-red-400"
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default PendienteCard;
