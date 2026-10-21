import express from 'express'
import dotenv from 'dotenv'
import rutasModuloProductos from './modulos/productos/productos.rutas.mjs'

dotenv.config()

// console.log(process.env.PUERTO)

const PUERTO = process.env.PUERTO || 3000

const app = express()
app.use(rutasModuloProductos)

app.listen(PUERTO)