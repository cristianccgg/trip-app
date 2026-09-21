import { useEffect, useState } from "react";
import FormularioGasto from "./components/FormularioGasto";
import Filtros from "./components/Filtros";
import ListaGastos from "./components/ListaGastos";
import Totales from "./components/Totales";

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

        <Filtros filtros={filtros} onChange={handleChange} />

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-100">
            Lista de gastos
          </h2>

          {gastosFiltrados.length === 0 ? (
            <p className="text-sm text-slate-500">
              Todavía no has agregado ningún gasto.
            </p>
          ) : (
            <ListaGastos
              gastosFiltrados={gastosFiltrados}
              onEliminar={eliminarGasto}
            />
          )}

          <Totales gastosFiltrados={gastosFiltrados} />
        </section>
      </div>
    </div>
  );
}

export default App;
