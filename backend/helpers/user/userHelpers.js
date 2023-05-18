const { pool } = require('../../db.js');
const bcrypt = require('bcrypt');
const validator = require('validator');


// MISCELLANEOUS USER HELPERS


// Password Hashing Function
const passwordHash = async (password, saltRounds) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash
    } catch (err) {
        console.log(err);
    }
    return null;
};
// Function to validate field length
const validateFieldLength = (field, fieldValue, min, max) => {
    if (!validator.isLength(fieldValue, {min, max})) {
        if (fieldValue.length < min) {
            return (`${field} TOO SHORT`)
        } else {
            return (`${field} TOO LONG`)
        }
        return
    }
}

// Function to check if user already exists
const findUserByEmail = async (email, cb) => {
    try {
        const SQL = 'SELECT * FROM users WHERE email=$1';
        const foundUser = await pool.query(SQL, [email])
        if (cb) {
            cb(null, foundUser.rows[0]);
        }
        return foundUser.rows[0] ? foundUser.rows[0]: null;
    } catch (err) {
        console.log(err)
        if (cb) {
            cb(err, null);
        }
    }
};

// Function to check if username is already taken
const findUserByUsername = async (username, cb) => {
    try {
        const SQL = 'SELECT * FROM users WHERE username=$1';
        const foundUser = await pool.query(SQL, [username])
        if (cb) {
            cb(null, foundUser.rows[0]);
        }
        return foundUser.rows[0] ? foundUser.rows[0]: null;
    } catch (err) {
        console.log(err);
        if (cb) {
            cb(err, null);
        }
    }
};

// Function to find user by ID
const findUserById = async (id, cb) => {
    try {
        const SQL = 'SELECT * FROM users WHERE id=$1';
        const foundUser = await pool.query(SQL, [id])
        if (cb) {
            cb(null, foundUser.rows[0]);
        }
        return foundUser.rows[0] ? foundUser.rows[0]: null;
    } catch (err) {
        console.log(err);
        if (cb) {
            cb(err, null);
        }
    }
};


// Function to update user field

const updateField = async (field, newFieldValue, username) => {
    try {
        const SQL = `UPDATE users SET ${field}=$1 WHERE username=$2`;
        await pool.query(SQL, [newFieldValue, username])
        return await findUserByUsername(username);
    } catch (err) {
        console.log(err);
    }
};



// Function to update user info
const updateUser = async (req, res) => {
    const { username, password, first_name, last_name, telephone, email } = req.body;
    if (password) {
        // PASSWORD STRENGTH; REFER TO DOCUMENTATION WHEN CREATED FRONT END PROMPT
        // if (!validator.isStrongPassword(password)) {
        //     res.json({message: 'PASSWORD NOT STRONG ENOUGH'});
        // }
        const hashedPassword = passwordHash(password);
        await updateField('password', hashedPassword, username);
        res.status(200).json({message: 'PASSWORD UPDATED'})
    }
    if (first_name) {
        validateFieldLength('FIRST NAME', first_name, 2, 20);
        const updatedUser = await updateField('first_name', first_name, username);
        res.status(200).json({message: `FIRST NAME UPDATED TO: ${updatedUser.first_name}`})
    }
    if (last_name) {
        validateFieldLength('LAST NAME', last_name, 2, 20);
        const updatedUser = await updateField('last_name', last_name, username);
        res.status(200).json({message:`LAST NAME UPDATED TO: ${updatedUser.last_name}`})

    }
    if (telephone) {
        // ADD PHONE VALIDATOR
        const updatedUser = await updateField('telephone',telephone, username);
        res.status(200).json({message: `PHONE NUMBER UPDATED TO: ${updatedUser.telephone}`})

    } 
    if (email) {
        if (!validator.isEmail(email)) {
            return res.status(409).json({message: 'INVALID EMAIL'});
            
        }
        const formattedEmail = validator.normalizeEmail(email); 
        
        // CHECK IF USER EXISTS IN DATABASE
        const userFound = await findUserByEmail(formattedEmail);
        if (userFound) {
            return res.status(409).json({message: 'EMAIL ALREADY IN USE'})
        }
        
                
        const updatedUser = await updateField('email', formattedEmail, username);
        res.status(200).json({message: `EMAIL UPDATED TO: ${updatedUser.email}`});
    }
}

// Middleware function to check if user is authenticated

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else res.redirect('/login')
}

// Middleware function to check if user is not authenticated

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    } else next();
}


// Exports
module.exports = { passwordHash, findUserByEmail, findUserByUsername, findUserById, updateUser, validateFieldLength, checkAuthenticated, checkNotAuthenticated }