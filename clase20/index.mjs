import express from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import pool from './conexion.bd.mjs'
// nanoId

dotenv.config()

// express-session
const PUERTO = 3000

const app = express()
app.listen(PUERTO)
// Parsea las cabeceras en donde vienen los datos de la cookie
app.use(cookieParser('palabra-clave'));
// Middleware para parsear los datos en codificacion de URL (urlencoded)
app.use(express.urlencoded({ extended: true }))

app.post('/autenticacion', async (req, res) => {
    console.log(req.body)
    const { usuario, pass } = req.body
    // chequear los datos
console.log(req.body)
    const resultado = await pool.query('SELECT * FROM usuarios WHERE username = $1',[usuario])
    // Comprobamos si hay registro
    let verificado =  await bcrypt.compare(pass, resultado.rows[0].password_hash); // true
    if (verificado) {
        console.log(verificado)
        // Crear cookie
        // Guardar en la tabla el sesion ID
        // UID
        // const sesionId = nanoid(10)
        // ----------------------------
        res.cookie('sesionId','123456',{
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            signed: true,
            maxAge: 1000 * 60 * 60 * 24 // milisegundos
        })
        return res.redirect('/admin')

    }
    res.redirect('/login?usuarioincorrecto')
})

app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body
    // chequear los datos
   
    // Insertamos en tabla/BD
    try{

        const salt = await bcrypt.genSalt(10);
        const clave_hasheada = await bcrypt.hash(pass, salt);
        // console.log(clave_hasheada)
        const resultado = await pool.query('INSERT INTO usuarios(username, password_hash) VALUES($1, $2)',[
            usuario,
            clave_hasheada
        ])
        res.redirect('/login?usuarioregistrado')
    }catch(error){  
        console.log(error)
        res.redirect('/login?errorenlainsersion')
    }
})



// Estáticos
function verificarCookie(req, res, next){
    console.log(req.signedCookies) //<--------------------------- aqui error, no solicitaba signedCookies
    if(req.signedCookies.sesionId === '123456'){
        return next()
    }
    res.redirect('/login/?autorizado=false')
}
app.use('/admin', verificarCookie, express.static(path.resolve('./front')))
app.use('/login', express.static(path.resolve('./login')))
