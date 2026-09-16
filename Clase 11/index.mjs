import exprees from 'express'

const PUERTO = 3000
 
const app = exprees()
app.listen(PUERTO)

//MiDDleware
app.use(exprees.json())

  
   //app.use('/', mid1)
   //esto sirve para una web estatica 
    app.use(exprees.static('./web'))

   
    app.get('/',(req,res)=>{
        console.log('/')
        res.end()
    })

     app.get('/saludo',(req,res)=>{
        console.log('/saludo')
        res.end()
    })
 app.post('/',(req,res)=>{
    
    res.end
 })