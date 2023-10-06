const express = require("express");
const app = express();
const port = 3005;
const fs = require('fs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.post('/formulario', (req, res) => {
    const { id, nombre, apellido, titulo_libro, autor_libro, editorial, lanzamiento } = req.body;

    // Validación del formulario
    if (!id || !nombre || !apellido || !titulo_libro || !autor_libro || !editorial || !lanzamiento) {
        return res.status(400).send('Por favor, complete todos los campos requeridos.');
    }

    // Crear el contenido del archivo
    const contenido = `
        Datos del estudiante:
        ID: ${id}
        Nombre: ${nombre}
        Apellido(s): ${apellido}

        Datos del libro:
        Título: ${titulo_libro}
        Autor: ${autor_libro}
        Editorial: ${editorial}
        Año de lanzamiento: ${lanzamiento}
    `;

    // Guardamos el contenido en un archivo de texto
    const rutaArchivo = `./data/`;
    const nombreArchivo = `id_${id}.txt`;

    fs.writeFile(rutaArchivo + nombreArchivo, contenido, (err) => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
        } else {
            console.log(`El archivo ${nombreArchivo} se ha guardado con éxito.`);
            
            // Descarga del archivo
            res.download(rutaArchivo + nombreArchivo, (err) => {
                if (err) {
                    console.error('Error al descargar el archivo:', err);
                }                
            });
        }
    });

     // Enviar la informacion al navegador (La omitimos res.send debido a que ya estamos usando res.download y presenta conflicto si se usan ambas)
     /*res.send(`
     <ul style="list-style-type:none;font-size: 18px;margin-top: 20px;border: 1px solid #ccc;padding: 10px;border-radius: 5px;background-color: #f9f9f9;font-family:'Helvetica'">
         <li><h2>Datos del estudiante:</h2></li>
         <li><b>ID:</b> ${id}</li>
         <li><b>Nombre:</b> ${nombre}</li>
         <li><b>Apellido(s):</b> ${apellido}</li>
         <li><h2>Datos del libro:</h2></li> 
         <li><b>Título:</b> ${titulo_libro}</li>
         <li><b>Autor:</b> ${autor_libro}</li>
         <li><b>Editorial:</b> ${editorial}</li>
         <li><b>Año de lanzamiento:</b> ${lanzamiento}</li>
     </ul>
     <p style="font-size: 1rempx;margin-top: 20px;padding: 10px;background-color: #f9f9f9;font-family:'Helvetica'">Regresar a <a href="/">inicio</a></p>
 `);*/
});

app.listen(port, () => console.log("Servidor corriendo en el puerto " + port));
