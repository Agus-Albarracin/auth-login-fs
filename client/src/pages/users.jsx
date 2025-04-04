import React from "react";

const User = () => {
  // Esto lo simula por ahora; después lo vas a reemplazar con datos reales desde la DB
  const clientes = [
    {
      id: 1,
      nombre: "Cliente 1",
      correo: "cliente1@empresa.com",
      telefono: "123456789",
    },
    {
      id: 2,
      nombre: "Cliente 2",
      correo: "cliente2@empresa.com",
      telefono: "987654321",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Clientes</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User