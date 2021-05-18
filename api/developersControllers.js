async function AllDevelopers(connection) {
    try {
        const [rows] = await connection.query(`SELECT * FROM developers;`)
        return [200, rows]        
    } catch(error) {    
        console.error(error)
        return [400, error.message]
    }
}

async function getDeveloper(id, connection) {
    try {
        const [rows] = await connection.query(`SELECT * FROM developers WHERE id = ${id}`)
        return [200, rows]
    } catch(error) {
        console.error(error)
        return [404, error.message]
    }
}

async function insertDeveloper(name, sexo, idade, hobby, datanascimento, connection) {
    try {
        const [rows] = await connection.query(`INSERT INTO developers (name, sexo, idade, hobby, datanascimento)
        VALUES ('${name}', '${sexo}', ${idade}, '${hobby}', '${datanascimento}');`)
        return [201, rows]
    } catch(error) {
        console.error(error)
        return [400, error.message]
    }
    
}

async function updateDeveloper(id, name, sexo, idade, hobby, datanascimento, connection) {
    try {
        const [rows] = await connection.query(`UPDATE developers SET name = '${name}', sexo = '${sexo}',
        idade = ${idade}, hobby = '${hobby}', datanascimento = '${datanascimento}' WHERE id = ${id};`)
        return [200, rows]
    } catch(error) {
        console.error(error)
        return [400, error]
    }
    
}

async function deleteDeveloper(id, connection) {
    try {
        const [rows] = await connection.query(`DELETE FROM developers WHERE id = ${id};`)
        return [204, rows]
    } catch(error) {
        console.error(error)
        return [400, error]
    }
}

module.exports = {AllDevelopers, getDeveloper, insertDeveloper, updateDeveloper, deleteDeveloper}