//import express from 'espress'
import { Router } from 'express'

const rutaapiv1 = new(Router)

rutaapiv1.get('/api/v1/camisetas', (req, res) => {
    
    res.status(200).json([
        {
            "id" :1,
            "nombre":"talleres",
            "precio" :"12000"
        }
    ])
})
rutaapiv1.get('/api/v1/camisetas/:id', (req, res) => {
    const id = req.params.id
    res.status(200).json([
        {
            "id" :2,
            "nombre":"boca",
            "precio" :"13000"
        }])
})


export default rutaapiv1