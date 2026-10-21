

export function obtenerProductos(datos){
    return datos.map((dato)=>{
        return {
            "id": dato.id,
            "franquicia": dato.franquicia,
            "valor": dato.valor,
            "color": dato.color,
        }
    })
}