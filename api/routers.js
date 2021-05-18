const controllers = require('./developersControllers')

class Routes {
    constructor(app, connect) {
        app.get('/developers', (req, res) => this.getAllDev(req, res, connect))
        app.get('/developers/:id', (req, res) => this.getDev(req, res, connect))
        app.post('/developers', (req, res) => this.postDev(req, res, connect))
        app.put('/developers/:id', (req, res) => this.putDev(req, res, connect))
        app.delete('/developers/:id', (req, res) => this.deleteDev(req, res, connect))
    }


    async getAllDev(req, res, con) {
        const [status, response] = await controllers.AllDevelopers(await con)
        return res.status(status).send({ response })
    }

    async getDev(req, res, con) {
        const id = req.params.id
        const [status, response] = await controllers.getDeveloper(id, await con)
        return res.status(status).send({ response })
    }

    async postDev(req, res, con) {
        const name = req.body.name
        const sexo = req.body.sexo
        const idade = req.body.idade
        const hobby = req.body.hobby
        const datanascimento = req.body.datanascimento
        const [status, response] = await controllers.insertDeveloper(name, sexo, idade, hobby, datanascimento, await con)
        return res.status(status).send({ response })
    }

    async putDev(req, res, con) {
        const id = req.params.id
        const name = req.body.name
        const sexo = req.body.sexo
        const idade = req.body.idade
        const hobby = req.body.hobby
        const datanascimento = req.body.datanascimento
        const [status, response] = await controllers.updateDeveloper(id, name, sexo, idade, hobby, datanascimento, await con)
        return res.status(status).send({ response })
    }

    async deleteDev(req, res, con) {
        const id = req.params.id
        const [status, response] = await controllers.deleteDeveloper(id, await con)
        return res.status(status).send({ response })
    }

}

module.exports = { Routes }