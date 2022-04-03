const userDao = require("../models/UserDao")

const UserService = async(name, email, password) => {
    try {
        const user = userDao.createUser(name, email, password)

        return user
    } catch (error) {
        console.log(error)
        throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
    }
}

module.exports = { UserService };
