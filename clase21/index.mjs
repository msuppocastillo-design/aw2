import express from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import pool from './conexion.bd.mjs'
import jwt from 'jsonwebtoken'
// nanoId

dotenv.config()

const CLAVE_PRIVADA = process.env.CLAVE_PRIVADA
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
    const resultado = await pool.query('SELECT * FROM usuarios WHERE username = $1', [usuario])
    // Comprobamos si hay registro
    let verificado = await bcrypt.compare(pass, resultado.rows[0].password_hash); // true
    if (verificado) {
        // Usuario autenticado

        jwt.sign({ usuario, rol: 1 }, CLAVE_PRIVADA, {expiresIn: '1h'}, function (err, token) {
            if (err) return res.redirect('/login?errorjwt')
            console.log(token);
            // Crear cookie
            // Guardar en la tabla el sesion ID
            // UID
            // const sesionId = nanoid(10)
            // ----------------------------
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                signed: true,
                maxAge: 1000 * 10 // milisegundos
            })
            return res.redirect('/admin')
        });


    }
    // res.redirect('/login?usuarioincorrecto')
})

app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body
    // chequear los datos

    // Insertamos en tabla/BD
    try {

        const salt = await bcrypt.genSalt(10);
        const clave_hasheada = await bcrypt.hash(pass, salt);
        // console.log(clave_hasheada)
        const resultado = await pool.query('INSERT INTO usuarios(username, password_hash) VALUES($1, $2)', [
            usuario,
            clave_hasheada
        ])
        res.redirect('/login?usuarioregistrado')
    } catch (error) {
        console.log(error)
        res.redirect('/login?errorenlainsersion')
    }
})



// Estáticos
function verificarToken(req, res, next) {
    //console.log(req.signedCookies) //<--------------------------- aqui error, no solicitaba signedCookies
    const token = req.signedCookies.token
    console.log(token)
    jwt.verify(token, CLAVE_PRIVADA, function (err, decoded) {
        if (err) return res.redirect('/login/?autorizado=false')
            console.log(decoded)
            next()

    });
    // if (req.signedCookies.sesionId === '123456') {
    //     return next()
    // }
}
app.use('/admin', verificarToken, express.static(path.resolve('./front')))
app.use('/login', express.static(path.resolve('./login')))
