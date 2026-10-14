import productos from "../../datos/productos.mjs";


export function obtenerProductos (){
    return productos
}
function obtenerProductos (id){
    //Filtramos
    const producto = productos.filter(producto => producto === id) 
    return productos 
}