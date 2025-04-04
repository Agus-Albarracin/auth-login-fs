const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

const PORT = 4100
app.listen(PORT , () =>{ 
    console.log(`El server esta corriendo en el puerto ${PORT}`)
})