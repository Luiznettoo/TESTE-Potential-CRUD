require('dotenv').config()
    
    const connection = async () => {
        const dbConfig = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            dateStrings: true,
          };
          const mysql = require("mysql2/promise");
          return await mysql.createConnection(dbConfig)
    }
    
    
    connection().then(async connection => {        
       await connection.query(
            `CREATE TABLE IF NOT EXISTS developers (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(45) NOT NULL,
                sexo VARCHAR(2) NOT NULL,
                idade INT(10) NOT NULL,
                hobby VARCHAR(45) NOT NULL,
                datanascimento DATE NOT NULL,
                PRIMARY KEY (id))
            ENGINE = InnoDB
            DEFAULT CHARACTER SET = utf8mb4`);
            console.log('executou a query');
    }).catch(error => console.error(error))
    