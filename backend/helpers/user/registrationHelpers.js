const { pool } = require('../../db.js');
const validator = require('validator');
const { passwordHash, findUserByEmail, findUserByUsername, validateFieldLength } = require('./userHelpers.js')


// REGISTRATION HELPERS
// ____________________


// Registration function to create user in database
const createUser = async (username, password, firstName, lastName, phone_number, email) => {
    const hashedPassword = await passwordHash(password, 10);
    const SQL = 'INSERT INTO users (username, password, first_name, last_name, phone_number, email) VALUES ($1, $2, $3, $4, $5, $6)';

    pool.query(SQL, [username, hashedPassword, firstName, lastName, phone_number, email], (error, results) => {
        if (error) {
            throw error
        }
    })
}
// Callback function for register route that will register user and return success result
const registerUser = async (req, res) => {
    const {username, password, firstName, lastName, phone_number, email} = req.body;
    try {

        // DATA VALIDATION AND FORMATTING
        if (validateFieldLength('USERNAME', username, 2, 20)) {
            return res.json({ message: validateFieldLength('USERNAME', username, 2, 20) })
        };
        if (validateFieldLength('FIRST NAME', firstName, 2, 20)) {
            return res.json({ message: validateFieldLength('FIRST NAME', username, 2, 20) })
        };
        if (validateFieldLength('LAST NAME', lastName, 2, 20)) {
            return res.json({ message: validateFieldLength('LAST NAME', username, 2, 20) })
        };

        // PASSWORD STRENGTH; REFER TO DOCUMENTATION WHEN CREATED FRONT END PROMPT
        // if (!validator.isStrongPassword(password)) {
        //     return res.json(message: {'PASSWORD NOT STRONG ENOUGH'});
        // }
        // if (!validator.isMobilePhone(phone_number)) {
        //     return res.json({message: 'INVALID PHONE NUMBER'});
        //     
        // }
        if (!validator.isEmail(email)) {
            return res.status(409).json({message: 'INVALID EMAIL'});
        }
        const formattedEmail = validator.normalizeEmail(email);

        // CHECK IF USER EXISTS IN DATABASE
        const userFound = await findUserByEmail(formattedEmail);
        if (userFound) {
            return res.status(409).json({message: 'EMAIL ALREADY IN USE'})
        }

        //CHECK IF USERNAME IS ALREADY TAKEN
        const usernameFound = await findUserByUsername(username)
        if (usernameFound) {
            return res.status(409).json({message: 'USERNAME TAKEN'})
        }


        await createUser(username, password, firstName, lastName, phone_number, formattedEmail);
        const createdUser = await findUserByEmail(formattedEmail);

        return res.status(200).json({message: `User created with ID: ${createdUser.id}`})
    } catch (err) {
        return res.status(500).json({message: err.message })
    }
    
}





module.exports = { registerUser }