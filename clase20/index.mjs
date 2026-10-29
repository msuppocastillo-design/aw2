import express from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
import pool from "./conexion.bd.mjs"
// express-session

dotenv.config()

const PUERTO = 3000

const app = express()
app.listen(PUERTO)
// Parsea las cabeceras en donde vienen los datos de la cookie
app.use(cookieParser('palabra-clave'));
// Middleware para parsear los datos en codificacion de URL (urlencoded)
app.use(express.urlencoded({ extended: true }))

app.post('/autenticacion', async(req, res) => {
    console.log(req.body)
    const { usuario, pass } = req.body

    const resultado  = await pool.query('SELECT * FROM usuario WHERE username = $1', [usuario])
    // chequear los datos
    let verificado = await bcrypt.compare(pass, resultado,rows[0].password_hash); // true

    if (verificado) {
        // Crear cookie
        res.cookie('sesionId',123456,{
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            signed: true,
            maxAge: 1000 * 60 * 60 * 24 // milisegundos
        })
        return res.redirect('/admin')

    }
    res.redirect('/login')
})

app.post('/registrar', async (req, res) => {
    console.log(req.body)
    const { usuario, pass } = req.body
    // chequear los datos
        const salt = await bcrypt.genSalt(10);
        const clave_hasheada = await bcrypt.hash(pass, salt);
      //  console.log(clave_hasheada)

    const resultado=  await pool.query('insert INTO usuarios (username, password_hash)value $1 $2 $3')([

        usuario,
        clave_hasheada
    ])
    res.redirect('/login?usuarioregistrado')
    
    // insertamos en tabla 
    res.redirect('/login')
})

// Estáticos
function verificarCookie(req, res, next){
    console.log(req.signedCookies)
    if(req.cookies.sesionId === '123456'){
        return next()
    }
    res.redirect('/login/?autorizado=false')
}
app.use('/admin', verificarCookie, express.static(path.resolve('./front')))
app.use('/login', express.static(path.resolve('./login')))