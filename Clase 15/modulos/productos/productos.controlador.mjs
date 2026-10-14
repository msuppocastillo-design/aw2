import * as modelo from './productos.modelo.mjs';
import * as vista from './productos.vistas.mjs';

export function obtenerProductosid (req,res){

    const id =Number(req.params.id)
    const productos = modelo.obtenerProductos(id)
    // aca incorporamos el modelo a la vista 
    res.json(productos)
}

export function obtenerProductos (req,res){
    const productos = modelo.obtenerProductos()
    const vista = vista.obtenerProductos()
    // aca incorporamos el modelo de la vista 
    res.json(productos)
}