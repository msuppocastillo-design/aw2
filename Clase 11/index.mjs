import express from 'express'

const PUERTO = 3000

const app = express()
app.listen(PUERTO)

// MIDDLEWARES
// Parseamos datos del cliente en formato JSON
app.use(express.json())
// Parseamos

app.use(express.urlencoded({extended: true}))

// El middleware express.static() sirve una web estática (recursos)
app.use(express.static('./web'))


app.get('/', (req, res) => {
    console.log('/')
    res.end()
})
app.get('/saludo', (req, res) => {
    console.log('/saludo')
    res.end()
})


// recibir datos del navegador/cliente
app.post('/datos',(req, res)=>{
    // Asignacion desestructurante
    const {nombre, apellido} = req.body
    console.log(nombre, apellido)
    res.end()
})