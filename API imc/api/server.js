const customExpress = require('./controllers/customExpress');

const app = customExpress(); 

let porta = process.env.PORT || 3000;

app.listen(porta, ()=> {
    console.log("Cors habilitado");
});