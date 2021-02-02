const paciente = require('../data/paciente.json');
const fs = require('fs');
const { Console } = require('console');


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
        
        fs.writeFile('./api/data/paciente.json', JSON.stringify(paciente), (err) => {
            if(err) throw err;
        });

        res.status(200).json(`Paciente Adicionado`);
    });

    //Deletar Paciente
    app.del('/deletar', (req, res) =>{
        const { nome, peso, altura} = req.body;
        const novoArrayPaciente = paciente.filter(valor => {
            if(!(valor.nome == nome && valor.peso == peso && valor.altura == altura)){
                return valor;
            }
        });
        if(novoArrayPaciente.length < paciente.length){
            console.log(typeof(paciente))
            console.log(typeof(novoArrayPaciente))
            console.log("cheguei aqui");
            fs.writeFile('./api/data/paciente.json', JSON.stringify(novoArrayPaciente), (err) => {
                if(err) throw err;
            });
        }else{
            res.status(200).send(`Nenhum paciente foi encontrado, com esses dados!`);
        }
        res.status(200).send(`Paciente Removido!`);
    });
}