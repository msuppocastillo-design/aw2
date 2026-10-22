import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'node:path'
import pool from './conexion.bd.mjs'
import { error } from 'node:console'

dotenv.config()


const PUERTO = process.env.PUERTO || 3000
const app = express()

const subirarchivos = multer({
    dest: path.resolve('archivo')
}).single('archivo')

//subirarchivos.singler('archivo')

app.post('/subir', (req,res)=>(
    subirarchivos(req,res,async (error)=>{
        if(error){
            // si la imagen no se pudo subir 
            return res.status(500).json({mensaje:'no se pudo subir la imagen'})
        }
        try{
            
            await pool.query('INSERT INTO producto(producto.precio.imagen)VALUE($1,$2,$3)',[req.body.prodcto,req.destroyed.precio, req.body.filaname])
            
        }catch(error){
            // hay que borrar la imagen error en la BD
            // responder con res.. status..
            console.log(error)
        }
        res.json({mensaje: 'se guardo'})
    })
    
   
))


app.use(express.static(path.resolve('publico')))
app.use('/archivo',express.static(path.resolve('archivo')))



app.listen(PUERTO)