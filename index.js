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
// Ruta GET /api/productos : Devolver todos los productos en JSON[cite: 2]
app.get('/api/productos', (req, res) => {
    // Respondemos con estado HTTP 200 y enviamos el array de productos en formato JSON[cite: 3]
    res.status(200).json(productos);
});

// Ruta GET /api/productos/:id : Buscar un producto por su ID[cite: 2]
app.get('/api/productos/:id', (req, res) => {
    // Extraemos el ID de la URL y lo convertimos a número entero
    const idBuscado = parseInt(req.params.id);
    
    // Usamos el método find de JavaScript para buscar el producto en el array
    const producto = productos.find(p => p.id === idBuscado);

    if (!producto) {
        // Si el producto solicitado no existe, respondemos con estado 404[cite: 3]
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    // Si existe, devolvemos el producto con estado 200[cite: 3]
    res.status(200).json(producto);
});
// Ruta POST /api/productos : Crear un producto nuevo[cite: 2]
app.post('/api/productos', (req, res) => {
    // Extraemos los datos que envía el cliente en el cuerpo (body) de la petición
    const { nombre, precio, categoria } = req.body;

    // Validaciones: nombre obligatorio/no vacío, y precio número mayor a cero
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '' || typeof precio !== 'number' || precio <= 0) {
        // Si los datos son inválidos, respondemos con estado HTTP 400
        return res.status(400).json({ error: 'Datos inválidos. El nombre es obligatorio y el precio debe ser un número mayor a cero.' });
    }

    // El servidor genera la id del producto nuevo
    // Si hay productos, tomamos el ID del último y le sumamos 1. Si no hay, le asignamos el 1.
    const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;

    // Armamos el objeto del nuevo producto
    const nuevoProducto = {
        id: nuevoId,
        nombre: nombre.trim(), // trim() elimina espacios en blanco al principio y al final
        precio: precio,
        categoria: categoria
    };

    // Modificamos el array para que los cambios se reflejen en consultas posteriores
    productos.push(nuevoProducto);

    // La creación exitosa responde con estado 201 y devolvemos el producto creado[cite: 3]
    res.status(201).json(nuevoProducto);
});
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});