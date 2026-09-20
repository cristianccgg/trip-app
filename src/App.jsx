import { useEffect, useState } from "react";
import { Edit, SquarePen, Trash } from "lucide-react";
import FormularioGasto from "./components/FormularioGasto";

const categorias = ["Comida", "Transporte", "Alojamiento", "Compras", "Otros"];
const monedas = ["USD", "COP"];
const metodosPago = ["Tarjeta", "Efectivo", "Paypal"];
const usuarios = ["Cristian", "Daniela", "Ambos"];
const ciudades = ["Orlando", "New York", "Bogota"];

function App() {
  const [gastos, setGastos] = useState(() => {
    const guardados = localStorage.getItem("gastos");
    if (guardados) {
      return JSON.parse(guardados);
    } else {
      return [];
    }
  });
  const [tasaCambio, setTasaCambio] = useState(null);
  const [cargandoTasa, setCargandoTasa] = useState(false);
  const [errorTasa, setErrorTasa] = useState(false);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    const tasaDeCambio = async () => {
      try {
        setCargandoTasa(true);
        const response = await fetch(
          `https://www.datos.gov.co/resource/32sa-8pi3.json?$limit=1&$order=vigenciadesde%20DESC`,
        );
        if (!response.ok) {
          throw new Error("Fallo la llamada de la tasa de cambio");
        }
        const data = await response.json();
        setTasaCambio(Number(data[0].valor));
      } catch {
        setErrorTasa(true);
      } finally {
        setCargandoTasa(false);
      }
    };
    tasaDeCambio();
  }, []);

  const [filtros, setFiltros] = useState({
    ciudad: "todas",
    categoria: "todas",
    pagador: "todas",
  });
  const [gastosFormulario, setGastosFormulario] = useState({
    titulo: "",
    ciudad: "",
    categoria: "",
    moneda: "",
    metodo: "",
    monto: "",
    fecha: new Date().toISOString().split("T")[0],
    nota: "",
    pagador: "",
  });

  const agregarGasto = () => {
    const nuevoGasto = {
      id: crypto.randomUUID(),
      titulo: gastosFormulario.titulo,
      ciudad: gastosFormulario.ciudad,
      categoria: gastosFormulario.categoria,
      moneda: gastosFormulario.moneda,
      metodo: gastosFormulario.metodo,
      monto: Number(gastosFormulario.monto),
      fecha: gastosFormulario.fecha,
      nota: gastosFormulario.nota,
      pagador: gastosFormulario.pagador,
      tasaAldia: tasaCambio,
    };
    setGastos((prevGastos) => [...prevGastos, nuevoGasto]);
    setGastosFormulario({
      titulo: "",
      ciudad: "",
      categoria: "",
      moneda: "",
      metodo: "",
      monto: "",
      fecha: new Date().toISOString().split("T")[0],
      nota: "",
      pagador: "",
    });
  };

  const eliminarGasto = (IdGasto) => {
    setGastos((prevGastos) =>
      prevGastos.filter((gasto) => gasto.id !== IdGasto),
    );
  };

  const handleGatosChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setGastosFormulario({
      ...gastosFormulario,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  const gastosFiltrados = gastos.filter(
    (gasto) =>
      (filtros.ciudad === "todas" || gasto.ciudad === filtros.ciudad) &&
      (filtros.categoria === "todas" ||
        gasto.categoria === filtros.categoria) &&
      (filtros.pagador === "todas" || gasto.pagador === filtros.pagador),
  );

  const totalGastos = gastosFiltrados.reduce(
    (total, gasto) => total + gasto.monto,
    0,
  );

  const totalUSD = gastosFiltrados.reduce(
    (total, gasto) => (gasto.moneda === "USD" ? total + gasto.monto : total),
    0,
  );

  const totalCOP = gastosFiltrados.reduce(
    (total, gasto) => (gasto.moneda === "COP" ? total + gasto.monto : total),
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
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-2xl font-semibold text-slate-100">
          Trip Dashboard
        </h1>
        {cargandoTasa ? (
          <p>Actualizando tasa de cambio...</p>
        ) : errorTasa ? (
          <p>No se pudo obtener la tasa de cambio.</p>
        ) : (
          <p>Tasa de cambio de hoy: ${tasaCambio}</p>
        )}

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-100">
            Nuevo gasto
          </h2>
          <FormularioGasto
            values={gastosFormulario}
            onChange={handleGatosChange}
            onSubmit={agregarGasto}
            disabled={cargandoTasa}
          />
        </section>

        <section className="flex flex-wrap gap-3">
          <select
            name="ciudad"
            value={filtros.ciudad}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-100">
            Lista de gastos
          </h2>

          {gastosFiltrados.length === 0 ? (
            <p className="text-sm text-slate-500">
              Todavía no has agregado ningún gasto.
            </p>
          ) : (
            <ul className="space-y-3">
              {gastosFiltrados.map((gasto) => (
                <li
                  key={gasto.id}
                  className="flex items-start justify-between gap-4 rounded-lg border border-slate-800 bg-slate-800/30 p-4 transition-colors hover:border-slate-700"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-slate-100">
                        {gasto.titulo}
                      </p>
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
                      <p className="mt-1 text-sm italic text-slate-500">
                        {gasto.nota}
                      </p>
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
                          {(gasto.monto * gasto.tasaAldia).toLocaleString(
                            "es-CO",
                            { maximumFractionDigits: 0 },
                          )}{" "}
                          COP
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <Edit className="h-4 w-4 cursor-pointer text-slate-500 hover:text-slate-300" />
                      <Trash
                        onClick={() => eliminarGasto(gasto.id)}
                        className="h-4 w-4 cursor-pointer text-slate-500 hover:text-red-400"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

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
        </section>
      </div>
    </div>
  );
}

export default App;
