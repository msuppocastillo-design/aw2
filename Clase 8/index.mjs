import express from 'express'

const PUERTO = 3000

const app = express()
app.get('/',(req,res)=>{

    // res.end("Hola express")
    //res.send("Hola Con send")
    res.send({mensaje:"hola"}) // masnda un objeto y lo toma como un .json

})



app.listen(PUERTO , ()=>(
    console.log(`Srevidor express corriendo en el puerto ${PUERTO}`)
))
