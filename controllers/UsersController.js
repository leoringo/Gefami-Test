
const { Users, History } = require('../models')
const { hash } = require('../helpers/crypto')
const { jwtSign } = require('../helpers/jsonwebtoken')
const { dateFormatter } = require('../helpers/utils')

class UsersController {
    static async register(req, res, next) {
        try {
            const { username, password, address } = req.body || {}

            if (!username) throw ({ name: "NULL_USERNAME" })

            if (!password) throw ({ name: "NULL_PASSWORD" })

            const isUniqueUsername = await Users.findOne({ where: { username } })

            if (isUniqueUsername) throw ({ name: "REGISTERED_USERNAME" })

            const newUser = await Users.create({ username, password, address })

            newUser.password = ''

            res.status(201).json(newUser)

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body || {}

            if (!username) throw { name: "NULL_USERNAME" }

            if (!password) throw { name: "NULL_PASSWORD" }

            const user = await Users.findOne({
                where: { username }
            })

            if (!user) throw { name: "INVALID_USERNAME" }

            const sha256cryptedPassword = hash(password)

            if (sha256cryptedPassword !== user.password) throw { name: "INVALID_PASSWORD" }

            const token = jwtSign({ id: user.id, username })

            await History.create({
                title: 'POST',
                description: `You've been log in on ${dateFormatter(new Date())}`,
                timestamp: new Date(),
                userId: user.id
            })


            res.status(200).json({ token, username, password: sha256cryptedPassword, address: user.address })

        } catch (error) {
            next(error)
        }
    }

    static async changeAddress(req, res, next) {
        try {
            const { userId } = req.user
            const { address } = req.body || {}

            if (!address) throw { name: 'INVALID_INPUT' }

            await Users.update({ address }, { where: { id: userId } })

            await History.create({
                title: 'EDIT',
                description: `Changing address into ${address} on ${dateFormatter(new Date())}!`,
                timestamp: new Date(),
                userId
            })

            res.status(200).json({ message: 'Address successfully changed!' })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UsersController