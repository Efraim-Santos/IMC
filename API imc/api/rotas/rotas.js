const paciente = require('../data/paciente.json');
const fs = require('fs');
const cors = require('cors');

module.exports = app => {

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
}