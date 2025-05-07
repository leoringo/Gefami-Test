const { jwtVerify } = require('../helpers/jsonwebtoken')

const authenticator = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) throw { name: 'UNAUTHENTICATED' }

        const { id, username } = jwtVerify(token)

        req.user = { userId: id, username }

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authenticator