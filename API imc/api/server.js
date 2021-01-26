const express = require('express');
const app = express();
const paciente = require('./data/paciente.json');
const cors = require('cors');

let porta = process.env.PORT || 3000;

app.use(express.json());

const opcoesCors = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.get('/pacientes', cors(opcoesCors), (req, res)=>{
    res.json( paciente );
});

app.listen(porta, ()=> {
    console.log("Cors habilitado");
});

module.exports = () => {
 return app;
}