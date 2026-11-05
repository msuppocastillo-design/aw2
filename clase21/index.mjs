import express from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import pool from './conexion.bd.mjs'
import jwt from 'jsonwebtoken'
import e from 'express'
// nanoId

dotenv.config()
 const Clave_privada 
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
        // usuario y contraseña correctos
        console.log(verificado)
        jwt.sign({usuario,rol:1 }, Clave_privada,{expiresIn:'1h'} ,function   (err, token)  {

         if (err) return res.redirect('/login?errorjwt')
            console.log(token)
        res.cookie('token',token,{
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            signed: true,
            maxAge: 1000 * 10 // milisegundos
        })
        return res.redirect('/admin')
        });
       

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
function verificartoken(req, res, next){
   // console.log(req.signedCookies) //<--------------------------- aqui error, no solicitaba signedCookies
   const token = req.signedCookies.token

   jwt.verify(token, Clave_privada, function(err, decoded) {
        if (err) {
            return res.redirect('/login/?autorizado=false')
            
            next()
        }

    
    });
   
   if(req.signedCookies.sesionId === '123456'){
        return next()
    }
    res.redirect('/login/?autorizado=false')
}
app.use('/admin', verificarCookie, express.static(path.resolve('./front')))
app.use('/login', express.static(path.resolve('./login')))
