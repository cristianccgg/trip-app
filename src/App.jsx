import { useEffect, useState } from "react";
import FormularioGasto from "./components/FormularioGasto";
import Filtros from "./components/Filtros";
import ListaGastos from "./components/ListaGastos";
import Totales from "./components/Totales";
import FormularioPendientes from "./components/FormularioPendientes";
import ListaPendientes from "./components/ListaPendientes";
import FormularioItinerario from "./components/FormularioItinerario";
import Presupuesto from "./components/Presupuesto";
import ListaItinerarios from "./components/ListaItinerarios";
import { categorias } from "./constants";

function App() {
  const [gastos, setGastos] = useState(() => {
    const guardados = localStorage.getItem("gastos");
    if (guardados) {
      return JSON.parse(guardados);
    } else {
      return [];
    }
  });
  const [tasaCambio, setTasaCambio] = useState(() => {
    const guardado = localStorage.getItem("tasaCambio");
    if (guardado) {
      return JSON.parse(guardado);
    } else {
      return null;
    }
  });
  const [cargandoTasa, setCargandoTasa] = useState(false);
  const [errorTasa, setErrorTasa] = useState(false);
  const [gastoEditando, setGastoEditando] = useState(null);
  const [abrirRegistro, setAbrirRegistro] = useState(false);
  const [tabActiva, setTabActiva] = useState("gastos");
  const [presupuesto, setPresupuesto] = useState(() => {
    const guardado = localStorage.getItem("presupuesto");
    if (guardado) {
      return JSON.parse(guardado);
    } else {
      return {
        total: "",
        orlando: "",
        newYork: "",
      };
    }
  });
  const [pendientes, setPendientes] = useState(() => {
    const guardados = localStorage.getItem("pendientes");
    if (guardados) {
      return JSON.parse(guardados);
    } else {
      return [];
    }
  });
  const [formPendientes, setFormPendientes] = useState({
    titulo: "",
    prioridad: "Baja",
    completado: false,
  });
  const [pendienteEditando, setPendienteEditando] = useState(null);
  const [pendienteEditForm, setPendienteEditForm] = useState({
    titulo: "",
    prioridad: "",
  });
  const [itinerario, setItinerario] = useState(() => {
    const guardado = localStorage.getItem("itinerario");
    if (guardado) {
      return JSON.parse(guardado);
    } else {
      return [];
    }
  });
  const [formItinerario, setFormItinerario] = useState({
    lugar: "",
    categoria: "",
    direccion: "",
    nota: "",
  });
  const [itinerarioEditando, setItinerarioEditando] = useState(null);
  const [itinerarioEditForm, setItinerarioEditForm] = useState({
    lugar: "",
    categoria: "",
    direccion: "",
    nota: "",
  });

  useEffect(() => {
    localStorage.setItem("itinerario", JSON.stringify(itinerario));
  }, [itinerario]);

  useEffect(() => {
    localStorage.setItem("pendientes", JSON.stringify(pendientes));
  }, [pendientes]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
  }, [presupuesto]);

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
        const nuevaTasa = Number(data[0].valor);
        setTasaCambio(nuevaTasa);
        localStorage.setItem("tasaCambio", JSON.stringify(nuevaTasa));
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

  const [gastoEditForm, setGastoEditForm] = useState({
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

  const iniciarEdicion = (gasto) => {
    setGastoEditando(gasto.id);
    setGastoEditForm({
      titulo: gasto.titulo,
      ciudad: gasto.ciudad,
      categoria: gasto.categoria,
      moneda: gasto.moneda,
      metodo: gasto.metodo,
      monto: gasto.monto,
      fecha: gasto.fecha,
      nota: gasto.nota,
      pagador: gasto.pagador,
    });
  };

  const iniciarEdicionPendiente = (pendiente) => {
    setPendienteEditando(pendiente.id);
    setPendienteEditForm({
      titulo: pendiente.titulo,
      prioridad: pendiente.prioridad,
    });
  };

  const iniciarEdicionItinerario = (itinerario) => {
    setItinerarioEditando(itinerario.id);
    setItinerarioEditForm({
      lugar: itinerario.lugar,
      categoria: itinerario.categoria,
      direccion: itinerario.direccion,
      nota: itinerario.nota,
    });
  };

  const editarItinerario = () => {
    setItinerario((prevItinerario) =>
      prevItinerario.map((item) =>
        item.id === itinerarioEditando
          ? {
              ...itinerario,
              lugar: itinerarioEditForm.lugar,
              categoria: itinerarioEditForm.categoria,
              direccion: itinerarioEditForm.direccion,
              nota: itinerarioEditForm.nota,
            }
          : item,
      ),
    );
    setItinerarioEditForm({
      lugar: "",
      categoria: "",
      direccion: "",
      nota: "",
    });
    setItinerarioEditando(null);
  };

  const editarGasto = () => {
    setGastos((prevGastos) =>
      prevGastos.map((gasto) =>
        gasto.id === gastoEditando
          ? {
              ...gasto,
              titulo: gastoEditForm.titulo,
              ciudad: gastoEditForm.ciudad,
              categoria: gastoEditForm.categoria,
              moneda: gastoEditForm.moneda,
              metodo: gastoEditForm.metodo,
              monto: Number(gastoEditForm.monto),
              fecha: gastoEditForm.fecha,
              nota: gastoEditForm.nota,
              pagador: gastoEditForm.pagador,
            }
          : gasto,
      ),
    );
    setGastoEditForm({
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
    setGastoEditando(null);
  };

  const cancelarEdicion = () => {
    setGastoEditando(null);

    setGastoEditForm({
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

  const cancelarRegistro = () => {
    setAbrirRegistro(false);
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

  const handleGastosChange = (e) => {
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

  const handleGastosEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setGastoEditForm({
      ...gastoEditForm,
      [name]: value,
    });
  };

  const handleChangePresupuesto = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPresupuesto({
      ...presupuesto,
      [name]: value,
    });
  };

  const handleChangeItinerario = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormItinerario({
      ...formItinerario,
      [name]: value,
    });
  };

  const agregarItinerario = () => {
    const nuevoLugar = {
      id: crypto.randomUUID(),
      lugar: formItinerario.lugar,
      categoria: formItinerario.categoria,
      direccion: formItinerario.direccion,
      nota: formItinerario.nota,
      completado: false,
    };
    setItinerario((prevItinerario) => [...prevItinerario, nuevoLugar]);
    setFormItinerario({
      lugar: "",
      categoria: "",
      direccion: "",
      nota: "",
    });
  };

  const eliminarItinerario = (IdItinerario) => {
    setItinerario((prevItinerario) =>
      prevItinerario.filter((item) => item.id !== IdItinerario),
    );
  };

  const cancelarEdicionItinerario = () => {
    setItinerarioEditando(null);
    setItinerarioEditForm({
      lugar: "",
      categoria: "",
      direccion: "",
      nota: "",
    });
  };

  const handleItinerarioEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setItinerarioEditForm({
      ...itinerarioEditForm,
      [name]: value,
    });
  };

  const agregarPendiente = () => {
    const nuevoPendiente = {
      id: crypto.randomUUID(),
      titulo: formPendientes.titulo,
      prioridad: formPendientes.prioridad,
      completado: formPendientes.completado,
    };
    setPendientes((prevPendientes) => [...prevPendientes, nuevoPendiente]);
    setFormPendientes({
      titulo: "",
      prioridad: "Baja",
      completado: false,
    });
  };

  const cancelarEdicionPendiente = () => {
    setPendienteEditando(null);
    setPendienteEditForm({
      titulo: "",
      prioridad: "",
    });
  };

  const editarPendiente = () => {
    setPendientes((prevPendientes) =>
      prevPendientes.map((pendiente) =>
        pendiente.id === pendienteEditando
          ? {
              ...pendiente,
              titulo: pendienteEditForm.titulo,
              prioridad: pendienteEditForm.prioridad,
            }
          : pendiente,
      ),
    );
    setPendienteEditForm({
      titulo: "",
      prioridad: "",
    });
    setPendienteEditando(null);
  };

  const marcarVisitado = (IdItinerario) => {
    setItinerario((prevItinerario) =>
      prevItinerario.map((item) =>
        item.id === IdItinerario
          ? { ...item, completado: !item.completado }
          : item,
      ),
    );
  };

  const handleChangePendientes = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormPendientes({
      ...formPendientes,
      [name]: value,
    });
  };

  const handlePendientesEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPendienteEditForm({
      ...pendienteEditForm,
      [name]: value,
    });
  };

  const marcarCompletado = (IdPendiente) => {
    setPendientes((prevPendientes) =>
      prevPendientes.map((pendiente) =>
        pendiente.id === IdPendiente
          ? { ...pendiente, completado: !pendiente.completado }
          : pendiente,
      ),
    );
  };

  const eliminarPendiente = (IdPendiente) => {
    setPendientes((prevPendientes) =>
      prevPendientes.filter((pendiente) => pendiente.id !== IdPendiente),
    );
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

        <Presupuesto values={presupuesto} onChange={handleChangePresupuesto} />

        <div className="flex gap-2 border-b border-slate-800">
          <button
            type="button"
            onClick={() => setTabActiva("gastos")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tabActiva === "gastos"
                ? "border-b-2 border-indigo-500 text-slate-100"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Gastos
          </button>
          <button
            type="button"
            onClick={() => setTabActiva("pendientes")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tabActiva === "pendientes"
                ? "border-b-2 border-indigo-500 text-slate-100"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Pendientes
          </button>
          <button
            type="button"
            onClick={() => setTabActiva("itinerario")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tabActiva === "itinerario"
                ? "border-b-2 border-indigo-500 text-slate-100"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Itinerario
          </button>
        </div>

        {tabActiva === "gastos" && (
          <div className="space-y-8">
            {!abrirRegistro ? (
              <button
                onClick={() => setAbrirRegistro(true)}
                type="button"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:col-span-3"
              >
                Registrar nuevo gasto
              </button>
            ) : (
              <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-100">
                  Nuevo gasto
                </h2>
                <FormularioGasto
                  values={gastosFormulario}
                  onChange={handleGastosChange}
                  onSubmit={agregarGasto}
                  disabled={cargandoTasa}
                  onCancelar={cancelarRegistro}
                />
              </section>
            )}

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
                  gastoEditando={gastoEditando}
                  gastoEditForm={gastoEditForm}
                  onChange={handleGastosEdit}
                  onEliminar={eliminarGasto}
                  onEditar={iniciarEdicion}
                  onCancelar={cancelarEdicion}
                  onSubmit={editarGasto}
                />
              )}

              <Totales
                gastosFiltrados={gastosFiltrados}
                presupuesto={presupuesto}
                tasaCambio={tasaCambio}
              />
            </section>
          </div>
        )}

        {tabActiva === "pendientes" && (
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-100">
              Pendientes
            </h2>
            <FormularioPendientes
              values={formPendientes}
              onChange={handleChangePendientes}
              onSubmit={agregarPendiente}
            />

            {pendientes.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">
                Todavía no has agregado ningún pendiente.
              </p>
            ) : (
              <div className="mt-4">
                <ListaPendientes
                  pendientes={pendientes}
                  onCompletado={marcarCompletado}
                  onChange={handlePendientesEdit}
                  pendienteEditando={pendienteEditando}
                  pendienteEditForm={pendienteEditForm}
                  onEditar={iniciarEdicionPendiente}
                  onSubmit={editarPendiente}
                  onEliminar={eliminarPendiente}
                  onCancelar={cancelarEdicionPendiente}
                />
              </div>
            )}
          </section>
        )}

        {tabActiva === "itinerario" && (
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-100">
              Itinerario
            </h2>
            <FormularioItinerario
              values={formItinerario}
              onChange={handleChangeItinerario}
              onSubmit={agregarItinerario}
            />

            {itinerario.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">
                Todavía no has agregado ningún lugar.
              </p>
            ) : (
              <div className="mt-4">
                <ListaItinerarios
                  itinerario={itinerario}
                  itinerarioEditando={itinerarioEditando}
                  itinerarioEditForm={itinerarioEditForm}
                  onChange={handleItinerarioEdit}
                  onEditar={iniciarEdicionItinerario}
                  onEliminar={eliminarItinerario}
                  onSubmit={editarItinerario}
                  onCancelar={cancelarEdicionItinerario}
                  onCompletar={marcarVisitado}
                />
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
