import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProyectosByCliente,
  createProyecto,
  updateProyecto,
  deleteProyecto,
} from "../services/proyectoService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ModalProyecto from "../components/ModalProyecto";

const ProyectosCliente = () => {
  const { clienteId } = useParams();
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const cargarProyectos = async () => {
    try {
      const data = await getProyectosByCliente(clienteId);
      setProyectos(data);
    } catch (err) {
      console.error(err);
      setProyectos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProyectos();
  }, [clienteId]);

  const handleGuardar = async (proyecto) => {
    try {
      if (proyecto.id) {
        await updateProyecto(proyecto.id, proyecto);
      } else {
        await createProyecto({ ...proyecto, cliente_id: clienteId });
      }
      setModalOpen(false);
      setProyectoSeleccionado(null);
      cargarProyectos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar este proyecto?")) {
      await deleteProyecto(id);
      cargarProyectos();
    }
  };

  console.log("se muestra proys", proyectos)
  console.log("es array?", Array.isArray(proyectos)); 
  return (
    <div style={{ padding: "20px" }}>
      <h2>Proyectos de "{proyectos[0]?.client?.nombre}"</h2>
      <button onClick={() => setModalOpen(true)} style={{ marginBottom: "10px" }}>
        <FaPlus /> Nuevo Proyecto
      </button>
      {loading ? (
        <p>Cargando proyectos...</p>
      ) : proyectos.length === 0 ? (
        <p>Este cliente no tiene proyectos.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Inicio</th>
              <th>Entrega</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.estado}</td>
                <td>{p.fecha_inicio?.substring(0, 10)}</td>
                <td>{p.fecha_entrega?.substring(0, 10)}</td>
                <td>
                  <button onClick={() => {
                    setProyectoSeleccionado(p);
                    setModalOpen(true);
                  }}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleEliminar(p.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <ModalProyecto
          proyecto={proyectoSeleccionado}
          onSave={handleGuardar}
          onClose={() => {
            setModalOpen(false);
            setProyectoSeleccionado(null);
          }}
        />
      )}
    </div>
  );
};

export default ProyectosCliente;
