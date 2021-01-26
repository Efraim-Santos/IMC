const express = require('express');
const app = express();
const paciente = require('./data/paciente.json');
const cors = require('cors');

let porta = process.env.PORT || 3000;

app.use(express.json());

const opcoesCors = {
    origin: 'Access-Control-Allow-Origin: *',
    optionsSucessStatus: 200
};

app.get('/pacientes', cors(opcoesCors), (req, res)=>{
    res.json( paciente );
});

app.listen(porta);

module.exports = () => {
 return app;
}