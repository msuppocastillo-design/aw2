// trabajar con un objeto

const productos = [
    {
        nombre: 'pantalon',
        precio: 100
    },
    {
        nombre: 'remera',
        precio: 150
    }
]

// Filter -> .filter()
// ver doc en MDN -> Arrays
// === !=
// <-- nuevo arreglo
const productosFiltrados = productos.filter((producto)=>{
    return Number(producto.precio) < 100
})

console.log(productosFiltrados)


// Find -> .find()
// ver doc en MDN -> Arrays
// <-- devuelve el elemento encontrado, si no undefined o null