const { Brand } = require('../models/models.js')
const ApiError = require('../error/ApiError.js');

class BrandController {
    async create(request, responce) {
        const { name } = request.body;
        const brand = await Brand.create({ name });
        return responce.json(brand);
    }

    async getAll(request, responce) {
        const brands = await Brand.findAll();
        return responce.json(brands);
    }

}

module.exports = new BrandController();