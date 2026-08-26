const numeros  = [1,2,3,4,5,6]
//Map

// const recorrer =()=> 
// {

// }
// numeros.map(recorrer)

//numeros.map((numero) => {
 //   console.log(numero)
//})
// const nuevoAreglo = numeros.map((numero) => {
//     console.log(numero)
//     return numero + 2
// })

// trabajar con objetos
const productos = [
    {
    nombre: "pantalon",
    precio: 100},
    {
    nombre: "Remera",
    precio: 50
    }
]
const productosconinteres = productos.map((producto) => {
    const productoCambiado = {
        nombre:producto.nombre,
        precio:producto.precio * 1.1
    }
    return productoCambiado
})
console.log(productosconinteres)
