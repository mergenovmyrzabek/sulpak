const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models.js')
const ApiError = require('../error/ApiError.js');
const { where } = require('sequelize');

class DeviceController {
    async create(request, responce, next) {
        try {
            const { name, price, brandId, typeId, info } = request.body;
            const { img } = request.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'img', fileName));
            const device = await Device.create({ name, price, brandId, typeId, img: fileName });

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return responce.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(request, responce) {
        let { brandId, typeId, limit, page } = request.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll(limit, offset);
        }
        else if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, limit, offset } });
        }
        else if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId, limit, offset } });
        }
        else {
            devices = await Device.findAndCountAll({ where: { brandId, typeId, limit, offset } });
        }

        responce.json(devices);
    }

    async getOne(request, responce) {
        const { id } = request.params;
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            },
        )
        return response.json(device);
    }
}

module.exports = new DeviceController();