import React from "react";

export const Admin = () => {
  // Datos simulados por ahora; se reemplazarán por datos reales
  const proyectos = [
    {
      id: 1,
      nombre: "Proyecto A",
      descripcion: "Sistema de gestión",
      estado: "pendiente",
      fecha_inicio: "2025-04-01",
      fecha_entrega: "2025-04-30",
      cliente_id: 1,
    },
    {
      id: 2,
      nombre: "Proyecto B",
      descripcion: "Sitio web corporativo",
      estado: "en progreso",
      fecha_inicio: "2025-03-15",
      fecha_entrega: "2025-04-20",
      cliente_id: 2,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Proyectos</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Inicio</th>
            <th>Entrega</th>
            <th>ID Cliente</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto) => (
            <tr key={proyecto.id}>
              <td>{proyecto.id}</td>
              <td>{proyecto.nombre}</td>
              <td>{proyecto.descripcion}</td>
              <td>{proyecto.estado}</td>
              <td>{proyecto.fecha_inicio}</td>
              <td>{proyecto.fecha_entrega}</td>
              <td>{proyecto.cliente_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin