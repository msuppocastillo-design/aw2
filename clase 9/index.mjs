import express from 'express'

const PUERTO = 3000

const app = express()
app.listen(PUERTO,()=>{
    console.log(`Servidor corriendo http://localhost:${PUERTO}`)
})

app.get('/', (req, res)=>{
    const usuarios = [
        {
            nombre: 'Andres',
            email: 'asenn@ies21.edu.ar'
        },
        {
            nombre: 'Joaquin',
            email: 'joa@mail.ar'
        },
    ]
    res.json(usuarios)
})

app.get('/saludo', (req, res)=>{
    res.json({mensaje:'Hola'})
})

// Rutas con parametros

app.get('/:id', (req, res)=>{
    const id = Number(req.params.id) // NaN
    //-----
    const usuarios = [
        {
            id: 1,
            nombre: 'Andres',
            email: 'asenn@ies21.edu.ar'
        },
        {
            id: 2,
            nombre: 'Joaquin',
            email: 'joa@mail.ar'
        },
    ]
    // ----
    // 1 Filtramos a partir del ID de usuario
    // condicion: el id del parametro debe ser igual al id del objeto usuario
    const usuariosFiltrados = usuarios.filter((usuario)=>{
        return usuario.id === id
    })
    if(usuariosFiltrados.legth > 0){
        res.json(usuariosFiltrados)
    }else{
        // res.status(404)
        res.status(404).json({mensaje: 'Usuario no encontrado'})
    }
})



app.post('/', (req, res)=>{
    const usuarios = [
        {
            nombre: 'Andres',
            email: 'asenn@ies21.edu.ar'
        },
        {
            nombre: 'Joaquin',
            email: 'joa@mail.ar'
        },
    ]
    res.json(usuarios)
})