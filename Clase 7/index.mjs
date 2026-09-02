import http from 'node:http' 

console.log('inicio')
const servidor = http.createServer((peticion,respuesta)=>{
   // console.log(peticion)
   //console.log('entrar peticion')
   console.log(peticion.url,peticion.method)
    respuesta.end(`hola desde el servidor`)
})


servidor.listen(3000,()=>{
    console.log('servidor arrancado' )
})