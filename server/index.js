const express = require('express');
const cors = require('cors');
const db = require('./models');
require('dotenv').config();
const userRoutes = require('./routes/usuarios.routes')
const authRoutes = require('./routes/auth.routes')

const app = express();
app.use(express.json());
app.use(cors())

// Rutas públicas:
app.use('/api/auth', authRoutes);

// Rutas
app.use('/api/usuarios', userRoutes);

// Sincronizar base de datos
db.sequelize.sync()
.then( console.log("Se ha iniciado la base de datos correctamente"))

const PORT = process.env.PORT_SERVER;
app.listen(PORT , () =>{ 
    console.log(`El server esta corriendo en el puerto ${PORT}`)
})
