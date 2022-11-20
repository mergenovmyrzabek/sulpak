const jwt = require('jsonwebtoken');

module.exports = function (request, responce, next) {
    if (request.method === "OPTIONS") {
        next();
    }
    try {
        const token = request.headers.authorization.split(' ')[1];
        if (!token) {
            return responce.status(401).json({message: "Не авторизован"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        request.user = decoded;
        next();
    } catch (e) {
        responce.status(401).json({message: "Не авторизован"});
    }
};