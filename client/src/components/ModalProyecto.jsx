import React, { useEffect, useState } from "react";
import "./ModalProyecto.css";

const ModalProyecto = ({ onClose, onSave, proyecto }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    estado: "pendiente",
    fecha_inicio: "",
    fecha_entrega: "",
  });

  useEffect(() => {
    if (proyecto) {
      setForm({
        nombre: proyecto.nombre || "",
        descripcion: proyecto.descripcion || "",
        estado: proyecto.estado || "pendiente",
        fecha_inicio: proyecto.fecha_inicio || "",
        fecha_entrega: proyecto.fecha_entrega || "",
      });
    } else {
      setForm({
        nombre: "",
        descripcion: "",
        estado: "pendiente",
        fecha_inicio: "",
        fecha_entrega: "",
      });
    }
  }, [proyecto]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const dataToSend = proyecto?.id ? { ...form, id: proyecto.id } : form;
    onSave(dataToSend);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">
          {proyecto?.id ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h3>

        <input
          name="nombre"
          className="modal-input"
          placeholder="Nombre del proyecto"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          name="descripcion"
          className="modal-input"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <select
          name="estado"
          className="modal-select"
          value={form.estado}
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completado">Completado</option>
        </select>

        <label className="modal-label">Fecha de inicio</label>
        <input
          type="date"
          name="fecha_inicio"
          className="modal-input"
          value={form.fecha_inicio}
          onChange={handleChange}
        />

        <label className="modal-label">Fecha de entrega</label>
        <input
          type="date"
          name="fecha_entrega"
          className="modal-input"
          value={form.fecha_entrega}
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal-btn save" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProyecto;
