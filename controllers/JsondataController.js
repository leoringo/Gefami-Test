const { dateFormatter } = require('../helpers/utils');
const { Jsondata, History } = require('../models');

class JsondataController {
    static async getJsonData(req, res, next) {
        try {
            const { userId } = req.user;

            const apiData = await Jsondata.findAll({ where: { userId }, attributes: { exclude: ['createdAt', 'updatedAt'] } })

            res.status(200).json(apiData)

        } catch (error) {
            next(error);
        }
    }

    static async createNewData(req, res, next) {
        try {
            const { title, body } = req.body || {}
            const { userId } = req.user

            if (!title || !body) throw { name: 'INVALID_INPUT' }

            await Jsondata.create({ title, body, userId })
            await History.create({
                title: 'POST',
                description: `Added new data with title ${title} on ${dateFormatter(new Date())}`,
                timestamp: new Date(),
                userId
            })

            res.status(201).json({ message: "Data successfully created!" })

        } catch (error) {
            next(error)
        }
    }

    static async destroyData(req, res, next) {
        try {
            const { id } = req.body || {}
            const { userId } = req.user

            const deletedData = Jsondata.destroy({ where: { id } })

            if (deletedData === 0) throw ({ name: "BAD_REQUEST" })

            History.create({
                title: 'DELETE',
                description: `Successfully delete data with ID ${id} on ${dateFormatter(new Date())}!`,
                timestamp: new Date(),
                userId
            })

            res.status(200).json({ message: 'Data Successfully Deleted!' })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = JsondataController;
