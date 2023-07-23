const express = require ('express');
const app = express();
const fs = require('fs');

app.listen (3000, console.log('Servidor iniciado en puerto 3000'));

app.use(express.json());


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
})

app.post('/canciones', (req, res) =>{
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf8'));
    canciones.push(cancion);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    res.send('Canción agregada con éxito');
})

app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf8'));
    res.send(canciones);
})

app.delete('/canciones/:id', (req, res) =>{
    const { id } = req.params;
    console.log(id);
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf8'));
    let index = canciones.findIndex(i=> i.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    res.send('Canción eliminada con éxito')
})

app.put('/canciones/:id', (req, res)=>{
    const cancion = req.body;
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf8'));
    let index = canciones.findIndex(i=> i.id == id);
    canciones[index] = cancion;
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    res.send('Cancion modificada coné xito')

})