const { pool } = require('../../db/server.js');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { passwordHash, findUserByEmail, findUserByUsername, checkIfUsernameTaken, checkIfEmailTaken, validateFieldLength } = require('./userHelpers.js')


// REGISTRATION HELPERS
// ____________________


// Registration function to create user in database
const createUser = async (username, password, first_name, last_name, telephone, email) => {
    const hashedPassword = await passwordHash(password, 10);
    const SQL = 'INSERT INTO users (username, password, first_name, last_name, telephone, email) VALUES ($1, $2, $3, $4, $5, $6)';

    await pool.query(SQL, [username, hashedPassword, first_name, last_name, telephone, email], (error, results) => {
        if (error) {
            throw error
        }
    })
}

// Callback function for register route that will register user and return success result
const registerUser = async (req, res) => {
    const {username, password, first_name, last_name, telephone, email} = req.query;
    try {
        // DATA VALIDATION AND FORMATTING
        validateFieldLength('USERNAME', username, 2, 20);
        validateFieldLength('FIRST NAME', first_name, 2, 20);
        validateFieldLength('LAST NAME', last_name, 2, 20);

        // PASSWORD STRENGTH; REFER TO DOCUMENTATION WHEN CREATED FRONT END PROMPT
        // if (!validator.isStrongPassword(password)) {
        //     res.send('PASSWORD NOT STRONG ENOUGH');
        //     return
        // }
        // if (!validator.isMobilePhone(telephone)) {
        //     res.send('INVALID PHONE NUMBER');
        //     return
        // }
        if (!validator.isEmail(email)) {
            res.send('INVALID EMAIL');
            return
        }
        const formattedEmail = validator.normalizeEmail(email);

        // CHECK IF USER EXISTS IN DATABASE
        checkIfEmailTaken(formattedEmail);
        //CHECK IF USERNAME IS ALREADY TAKEN
        checkIfUsernameTaken(username)
        await createUser(username, password, first_name, last_name, telephone, formattedEmail);
        const createdUser = await findUserByEmail(formattedEmail);
        res.send(`USER CREATED WITH ID: ${createdUser[0].id}`)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
}





module.exports = { registerUser }