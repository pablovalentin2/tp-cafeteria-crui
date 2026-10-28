const express = require('express');
const app = express();

// El servidor deberá escuchar en el puerto 3000[cite: 2]
const PORT = 3000;

// Middleware fundamental: le avisa a Express que vamos a recibir y enviar información en formato JSON[cite: 3]
app.use(express.json());

// Colección de productos inicial provista en la consigna[cite: 1]
const productos = [
    { id: 1, nombre: 'Café con leche', precio: 1800, categoria: 'bebida' },
    { id: 2, nombre: 'Medialuna', precio: 900, categoria: 'comida' },
    { id: 3, nombre: 'Tostado de jamón y queso', precio: 3500, categoria: 'comida' },
    { id: 4, nombre: 'Agua mineral', precio: 1200, categoria: 'bebida' }
];

// Ruta GET / : Mostrar un mensaje de bienvenida[cite: 2]
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de la Cafetería del CRUI');
});

// Poner al servidor a escuchar las peticiones
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});