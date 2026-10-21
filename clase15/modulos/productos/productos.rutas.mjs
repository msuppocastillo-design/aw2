import { Router } from "express"
import * as controlador from './productos.controlador.mjs'

const rutasModuloProductos = new Router()

rutasModuloProductos.get(`${URL_BASE}/productos`, controlador.obtenerProductos)

export default rutasModuloProductos