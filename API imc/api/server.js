const express = require('express');
const app = express();
const paciente = require('./data/paciente.json');
const cors = require('cors');
const fs = require('fs');
const { json } = require('express');

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

app.post('/adicionarPaciente', (req, res) => {
    const { nome, peso, altura, imc } = req.body;
    
    let dados = {
        nome,
        peso,
        altura,
        imc
    };

    paciente.push(dados);
    
    fs.writeFile('./api/data/paciente.json', JSON.stringify(paciente), (err) => {
        if(err) throw err;
        console.log("Salvo");
    });
    res.json("ok");
});

app.listen(porta, ()=> {
    console.log("Cors habilitado");
});

module.exports = () => {
 return app;
}