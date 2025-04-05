import React, { useEffect, useState } from "react";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../services/clientService";
import { createProyecto } from "../services/proyectoService"
import ModalCliente from "../components/ModalCliente";
import ModalProyecto from "../components/ModalProyecto";
import { FaEdit, FaTrash, FaPlus, FaFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProyectoOpen, setModalProyectoOpen] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const navigate = useNavigate();

  const cargarClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      setClientes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleGuardar = async (cliente) => {
    try {
      if (cliente.id) {
        await updateCliente(cliente.id, cliente);
      } else {
        await createCliente(cliente);
      }
      setModalOpen(false);
      setClienteSeleccionado(null);
      cargarClientes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleGuardarProyecto = async (proyecto) => {
    try {
      await createProyecto(proyecto);
      setModalProyectoOpen(false);
      setClienteSeleccionado(null);
    } catch (err) {
      console.error("Error guardando proyecto:", err);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
      await deleteCliente(id);
      cargarClientes();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Clientes</h2>
      <button onClick={() => setModalOpen(true)} style={{ marginBottom: "10px" }}>
        <FaPlus /> Nuevo Cliente
      </button>
      {loading ? (
        <p>Cargando...</p>
      ) : clientes.length === 0 ? (
        <p>Todavía no hay clientes.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
                <td>
                  <button onClick={() => navigate(`/proys/${cliente.id}`)}>
                    <FaFolderOpen />
                  </button>
                  <button onClick={() => {
                    setClienteSeleccionado(cliente);
                    setModalOpen(true);
                  }}>
                    <FaEdit />
                  </button>
                  <button onClick={() => {
                    setClienteSeleccionado(cliente);
                    setModalProyectoOpen(true);
                  }}>
                    <FaPlus /> Proyecto
                  </button>
                  <button onClick={() => handleEliminar(cliente.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <ModalCliente
          onClose={() => {
            setModalOpen(false);
            setClienteSeleccionado(null);
          }}
          onSave={handleGuardar}
          cliente={clienteSeleccionado}
        />
      )}
      {modalProyectoOpen && clienteSeleccionado && (
        <ModalProyecto
          cliente={clienteSeleccionado}
          onClose={() => {
            setModalProyectoOpen(false);
            setClienteSeleccionado(null);
          }}
          onSave={handleGuardarProyecto}
        />
      )}
    </div>
  );
};

export default User;
