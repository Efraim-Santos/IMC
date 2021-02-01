const express = require('express');
const consign = require('consign');
const cors = require('cors');

module.exports = () => { 
    
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.options('*', cors())
    
    consign()
        .include('api/rotas')
        .into(app)

    return app;
};