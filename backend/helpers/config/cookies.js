const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


// USER TOKEN GENERATOR

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number
    }
    const token = jwt.sign(payload, process.env.USER_TOKEN_SECRET)
    return token
}

// MIDDLEWARE TO VERIFY THE JWT

const verifyToken = (req, res, next)=> {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message: 'Token not provided'})
    }
    try {
        const decoded = jwt.verify(token, process.env.USER_TOKEN_SECRET, { expiresIn: '9999 years' });
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(401).json({message:'Session expired. Please refresh and log in again.'})
    }
}

module.exports = {generateToken, verifyToken}