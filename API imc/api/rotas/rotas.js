const paciente = require('../data/paciente.json');
const fs = require('fs');
const { Console } = require('console');

function salvarDados(dados){
    fs.writeFile('./api/data/paciente.json', dados, (err) => {
        if(err) throw err;
    });
}

module.exports = app => {

   // const opcoesCors = {
    //     origin: "*",
    //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     preflightContinue: false,
    //     optionsSuccessStatus: 204
    // };
    // app.get('/pacientes', cors(opcoesCors), (req, res)=>{
    //     res.json( paciente );
    // });

    //Buscar Paciente
    app.get('/pacientes', (req, res)=>{
        res.json(paciente);
    });

    //Adicionar Paciente
    app.post('/adicionarPaciente', (req, res) => {
        const { nome, peso, altura, deletar } = req.body;
        let dados = {
            nome,
            peso,
            altura,
            deletar
        };

        paciente.push(dados);
        
        salvarDados(JSON.stringify(paciente))

        res.status(200).json(`Paciente Adicionado`);
    });

    //Deletar Paciente
    app.del('/deletar', (req, res) =>{

        const { nome, peso, altura} = req.body;

        const totalElementos = paciente.length;

        paciente = paciente.filter(valor => {
            if(!(valor.nome == nome && valor.peso == peso && valor.altura == altura)){
                return valor;
            }
        });
        if(paciente.length < totalElementos){
            salvarDados(JSON.stringify(paciente)); 
             res.status(200).json(`Paciente Removido!`);
        }else{
            res.status(200).json(`Nenhum paciente foi encontrado, com esses dados!`);
        }
    });
}