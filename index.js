/*const http = require('http');
const port = 3005

const server = http.createServer((req, res)=>{
    res.end('Repuesta')
})  

server.listen(port,()=>console.log("Servidor corriendo en el puerto " + port))*/

const express = require("express")

const app = express()
const port = 3005
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.get('/', (req, res)=>{
    res.send('Hola desde Express')
});
app.get('/unicosta', (req, res)=>{
    res.send('Hola desde la pagina de Unicosta')
});
/*app.get('/formulario', (req, res)=>{
    const {nombre, apellido } = req.query;
    res.send(`Hola ${nombre} ${apellido}`);
});*/
app.post('/formulario', (req, res)=>{
    console.log(req.body);
    const {nombre, apellido} = req.body;
    /*if (!nombre || !apellido) {
        res.send('Faltan datos');
    }*/
    if (!nombre || !apellido) return res.redirect('/error.html');   
    res.send(`Hola ${nombre} ${apellido}`);
});
app.listen(port,()=>console.log("Servidor corriendo en el puerto " + port));