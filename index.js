const express = require('express');
const conectarDB = require('./config/db');

const app = express();


// Conectar a la base de datos
conectarDB();

const port = process.env.PORT || 4000;

app.use(express.json());
// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));


app.listen(port, '0.0.0.0', ()=> {
    console.log(`Server is running on port ${port}`);
})