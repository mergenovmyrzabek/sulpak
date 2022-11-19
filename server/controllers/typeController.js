const { Type } = require('../models/models.js');
const ApiError = require('../error/ApiError.js');

class TypeController {
    async create(request, responce) {
        const {name} = request.body;
        const type = await Type.create({name});
        return responce.json(type);
    }

    async getAll(request, responce) {
        const types = await Type.findAll();
        return responce.json(types);
    }

}

module.exports = new TypeController();