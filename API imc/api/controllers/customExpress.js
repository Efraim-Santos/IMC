const express = require('express');
const consign = require('consign');

module.exports = () => { 
    
    const app = express();

    app.use(express.json());
  

    consign()
        .include('api/rotas')
        .into(app)

    return app;
};