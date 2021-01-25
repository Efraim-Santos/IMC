const express = require('express');
const app = express();
const paciente = require('./data/paciente.json');
let porta = process.env.PORT || 3000;

app.use(express.json());

app.get('/pacientes', (req, res)=>{
    res.json( paciente );
});

app.listen(porta);