import express from "express";
import dotenv from 'dotenv';


dotenv.config()
//console.log(process.env)

const PUERTO = process.env.PUERTO ||3000



const app = express();


app.get('/api/v1/productos',(req, res)=>{
   const resultado =  pg.query('SELECT * FROM productos')
    console.log(resultado)
    res.json({})
})
    
app.listen(PUERTO);