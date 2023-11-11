const bcrypt = require('bcrypt')

encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return hashedPassword = await bcrypt.hashSync(password, salt)
}

validatePassword = async (password, hashedPassword) => {
    return matchedPassword = await bcrypt.compareSync(password, hashedPassword)
}

module.exports = { encryptPassword, validatePassword };