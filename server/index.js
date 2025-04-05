require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/usuarios.routes')
const authRoutes = require('./routes/auth.routes')
const clientRoutes = require('./routes/clientes.routes')

const app = express();
app.use(express.json());
app.use(cors())

// Rutas públicas:
app.use('/api/auth', authRoutes);

// Rutas privadas:
app.use('/api/usuarios', userRoutes);
app.use('/api/cliente', clientRoutes)

// Sincronizar base de datos
db.sequelize.sync()
.then( console.log("Se ha iniciado la base de datos correctamente"))

const PORT = process.env.PORT_SERVER;
app.listen(PORT , () =>{ 
    console.log(`El server esta corriendo en el puerto ${PORT}`)
})
