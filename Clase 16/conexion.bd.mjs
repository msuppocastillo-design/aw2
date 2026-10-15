import {pool} from 'pg'
import dotenv from 'dotenv';

const pool = new pool({
    user: process.env.BD_USER, password: process.env.BD_PASS,database: process.env.BD_BD,port: process.env.BD_PORT,  
})


export default pool