const ApiError = require('../error/ApiError.js');

module.exports = function (error, request, responce, next) {
    if (error instanceof ApiError) {
        responce.status(error.status).json({ message: error.message });
    }
    return responce.status(500).json({ message: "Unknown error!" });
}