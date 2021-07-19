const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => new Promise(async (resolve, reject) => {
    try {
        resolve(await bcrypt.hash(password, 12))
    } catch (error) {
        reject(error)
    }
});

const comparewPassword = (clientPass, dbPass) => new Promise(async (resolve, reject) => {
    try {
        resolve(await bcrypt.compareSync(clientPass, dbPass))
    } catch (error) {
        reject(error)
    }
});

const formateData = (data) => {
    data.dob = new Date(data.dob);
    data.contact = parseInt(data.contact);
    return data;
};

const generarteToken = (user) => {
    return jwt.sign({
        userId: user._id,
        username: user.username,
        userRole: user.role
    }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_SESSION_TIME });
};

const sendUser = (user) => {
    return {_id: user._id, email: user.email, contact: user.contact,}
};

module.exports = {
    hashPassword,
    comparewPassword,
    formateData,
    generarteToken,
    sendUser
};