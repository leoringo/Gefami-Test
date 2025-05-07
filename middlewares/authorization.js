const authorization = async (req, res, next) => {
    try {
        const scopeHeader = req.headers.scope
        const userIdHeader = req.headers['user-id']

        if (!scopeHeader || !userIdHeader || scopeHeader !== 'user' || userIdHeader !== 'ifabula') {
            throw ({ name: "UNAUTHORIZED" })
        }

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authorization
