const crypto = require('crypto')

const hash = (value) => {
    const sha256crypto = crypto.createHash('sha256')
    const hashedValue = sha256crypto.update(value).digest('hex')
    return hashedValue
}

module.exports = { hash }