import React, { useState, useEffect } from "react";
import "./ModalCliente.css";

const ModalCliente = ({ onClose, onSave, cliente }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre || "");
      setCorreo(cliente.correo || "");
      setTelefono(cliente.telefono || "");
    }
  }, [cliente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteData = {
      id: cliente?.id,
      nombre,
      correo,
      telefono,
    };
    onSave(clienteData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{cliente ? "Editar Cliente" : "Nuevo Cliente"}</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="submit">{cliente ? "Actualizar" : "Crear"}</button>
            <button type="button" onClick={onClose} className="cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCliente;
