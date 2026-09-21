import React from "react";

const Totales = ({ gastosFiltrados }) => {
  const totalUSD = gastosFiltrados.reduce(
    (total, gasto) => (gasto.moneda === "USD" ? total + gasto.monto : total),
    0,
  );

  const totalEnCOP = gastosFiltrados.reduce(
    (total, gasto) =>
      gasto.moneda === "USD"
        ? total + gasto.monto * gasto.tasaAldia
        : total + gasto.monto,
    0,
  );

  const totalPorCiudad = gastosFiltrados.reduce((total, gasto) => {
    if (!total[gasto.ciudad]) {
      total[gasto.ciudad] = { USD: 0, COP: 0 };
    }
    if (gasto.moneda === "USD") {
      total[gasto.ciudad].USD += gasto.monto;
      total[gasto.ciudad].COP += gasto.monto * gasto.tasaAldia;
    } else {
      total[gasto.ciudad].COP += gasto.monto;
    }
    return total;
  }, {});

  const totalPorPagador = gastosFiltrados.reduce((total, gasto) => {
    if (gasto.pagador === "Ambos") {
      if (!total["Cristian"]) {
        total["Cristian"] = { USD: 0, COP: 0 };
      }
      if (!total["Daniela"]) {
        total["Daniela"] = { USD: 0, COP: 0 };
      }
      if (gasto.moneda === "USD") {
        total["Cristian"].USD += gasto.monto / 2;
        total["Cristian"].COP += (gasto.monto / 2) * gasto.tasaAldia;
        total["Daniela"].USD += gasto.monto / 2;
        total["Daniela"].COP += (gasto.monto / 2) * gasto.tasaAldia;
      } else {
        total["Cristian"].COP += gasto.monto / 2;
        total["Daniela"].COP += gasto.monto / 2;
      }
    } else {
      if (!total[gasto.pagador]) {
        total[gasto.pagador] = { USD: 0, COP: 0 };
      }
      if (gasto.moneda === "USD") {
        total[gasto.pagador].USD += gasto.monto;
        total[gasto.pagador].COP += gasto.monto * gasto.tasaAldia;
      } else {
        total[gasto.pagador].COP += gasto.monto;
      }
    }
    return total;
  }, {});

  return (
    <div className="mt-6 space-y-4 border-t border-slate-800 pt-4">
      <div>
        <span className="text-sm text-slate-400">Total gastado</span>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 p-3">
            <h3 className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
              Dólares
            </h3>
            <span className="text-2xl font-bold text-slate-100">
              ${totalUSD.toLocaleString("en-US")}
              <span className="ml-1 text-sm font-medium text-slate-500">
                USD
              </span>
            </span>
          </div>
          <div className="rounded-lg border border-indigo-900/50 bg-indigo-950/30 p-3">
            <h3 className="text-xs font-semibold tracking-wide text-indigo-400 uppercase">
              Pesos
            </h3>
            <span className="text-2xl font-bold text-slate-100">
              $
              {totalEnCOP.toLocaleString("es-CO", {
                maximumFractionDigits: 0,
              })}
              <span className="ml-1 text-sm font-medium text-slate-500">
                COP
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-800/50 p-3">
          <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Por ciudad
          </p>
          <div className="space-y-2">
            {Object.entries(totalPorCiudad).map(([ciudad, total]) => (
              <div key={ciudad} className="text-sm">
                <span className="text-slate-300">{ciudad}</span>
                <div className="mt-0.5 flex justify-between text-xs">
                  <span className="text-emerald-400">
                    ${total.USD.toLocaleString("en-US")} USD
                  </span>
                  <span className="text-indigo-400">
                    $
                    {total.COP.toLocaleString("es-CO", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    COP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-slate-800/50 p-3">
          <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Por pagador
          </p>
          <div className="space-y-2">
            {Object.entries(totalPorPagador).map(([pagador, total]) => (
              <div key={pagador} className="text-sm">
                <span className="text-slate-300">{pagador}</span>
                <div className="mt-0.5 flex justify-between text-xs">
                  <span className="text-emerald-400">
                    ${total.USD.toLocaleString("en-US")} USD
                  </span>
                  <span className="text-indigo-400">
                    $
                    {total.COP.toLocaleString("es-CO", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    COP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Totales;
