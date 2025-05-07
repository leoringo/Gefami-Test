const errorHandler = (err, req, res, next) => {
    console.log(err)
    let status = 500
    let message = 'Internal Server Error'

    switch (err.name) {
        case "UNAUTHENTICATED":
        case "JsonWebTokenError":
            status = 401
            message = 'You Are Not Authenticated!'
            break;

        case "FORBIDDEN":
            status = 403
            message = 'You Are Not Authorized'
            break;

        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors[0].message
            break;

        case "NULL_USERNAME":
            status = 400
            message = 'Username Required'
            break;

        case "NULL_PASSWORD":
            status = 400
            message = 'Password Required'
            break;

        case "INVALID_USERNAME":
            status = 401
            message = 'Invalid Username'
            break;

        case "INVALID_PASSWORD":
            status = 401
            message = 'Invalid Password'
            break;

        case "REGISTERED_USERNAME":
            status = 404
            message = 'Username already registered!'
            break;

        case "UNAUTHORIZED":
            status = 401
            message = 'UNAUTHORIZED'
            break;

        case "INVALID_INPUT":
            status = 404
            message = 'Please fill the empty form'
            break;

        case "BAD_REQUEST":
            status = 404
            message = 'Something went wrong'
            break;
    }

    res.status(status).json({ message })
}

module.exports = errorHandler