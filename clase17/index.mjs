import express from 'express'
import dotenv from 'dotenv'
import pool from './conexion.bd.mjs'

dotenv.config()


const PUERTO = process.env.PUERTO || 3000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get('/api/v1/productos', async (req, res)=>{
    const resultado = await pool.query('SELECT * FROM productos');
    console.log(resultado.rows);
    res.json(resultado.rows)
})



app.get('/api/v1/productos/:id', async (req, res)=>{
    const id = Number(req.params.id)
    const resultado = await pool.query('SELECT * FROM productos WHERE id=$1 RETURNING id',[id]);
    console.log(resultado.rows);
    res.json(resultado.rows)
})


app.post('/api/v1/productos', async (req, res)=>{
    const datos = req.body
    console.log(datos)
    const resultado = await pool.query('INSERT INTO productos(producto, precio) VALUES($1, $2)  RETURNING id', [datos.producto, datos.precio]);
    console.log(resultado.rows);
    res.json(resultado.rows)
})

app.listen(PUERTO)