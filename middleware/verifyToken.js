const { setResponse } = require('../helpers');
const { User } = require('../models')
const jwt = require('jsonwebtoken');


const protectRoutes = async (req, res, next) => {

    try {
        const authHeader = req.headers['authorization']
        // console.log(authHeader);

        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401) // Unautorized
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
            // console.log(user)
            if (err && err.message == "jwt expired") return res.status(403).json({ message: 'Please login again!' })
            if (err) return res.sendStatus(403)
            else if (!await User.findById(user.userId)) return res.sendStatus(403);
            req.user = user

            next()
        })
    } catch (error) {
        setResponse(res, { type: "bad", message: 'Invalid Token!' })
    }
};

const adminOnly = (req, res, next) => {
    try {

        if (req.user.userRole === 'admin') {
            next();
        } else res.sendStatus(401)
    } catch (error) {
        res.sendStatus(401)
    }
}

module.exports = { protectRoutes, adminOnly }