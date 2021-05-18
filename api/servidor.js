( async () => {

const porta = 3003
require('dotenv').config()
const {Routes} = require('./routers')
const express = require('express')
const cors = require('cors')
const app =  express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

new Routes(app, await connect()) 

app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`)
})

async function connect(){
    const dbConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dateStrings: true,
    };
    const mysql = require("mysql2/promise");
    try {
      const connection = await mysql.createConnection(dbConfig);
      console.log('Ação efetuada com sucesso!');
      return connection;
    } catch (error) {
       console.log(error);
    }
    
}

})()