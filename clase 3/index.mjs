//console.log(`hola`)

// Uso de modulos built-in de node
// con el sistema de modulos modernos 
import os from 'node:os';

console .log(os.totalmem() / 1024 / 1024 / 1024) // en GB;

console.log(os.freemem() / 1024 / 1024 / 1024) - console.log(os.totalmem() / 1024 / 1024 / 1024) // en GB;