const { History } = require('../models');

class HistoryController {
    static async getAllHistories(req, res, next) {
        try {
            const { userId } = req.user;

            const getHistories = await History.findAll({
                where: { userId },
                order: [['timestamp', 'desc']],
                attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] }
            });

            res.status(200).json(getHistories);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = HistoryController;
