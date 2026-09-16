import exprees from 'express'

const PUERTO = 3000
 
const app = exprees()
app.listen(PUERTO)

//MiDDleware


   const mid1 = (req , res,next)=> {
    console.log ('se ejecuto el middleware')
    next()
   }
   const mid2 = (req , res,next)=> {
    console.log ('se ejecuto el middleware2')
    next()
   }
   //app.use('/', mid1)
    app.use('/saludo' , mid1)
    
   
    app.get('/',(req,res)=>{
        console.log('/')
        res.end()
    })

     app.get('/saludo',(req,res)=>{
        console.log('/saludo')
        res.end()
    })
