const { pool } = require('../../db/server.js');
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
            res.send(`${field} TOO SHORT`)
        } else {
            res.send(`${field} TOO LONG`)
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
        return foundUser.rows
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
        return foundUser.rows;
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
        return foundUser.rows;
    } catch (err) {
        console.log(err);
        if (cb) {
            cb(err, null);
        }
    }
};

// Function to check if username is taken 

const checkIfUsernameTaken = async (username) => {
    const usernameFound = await findUserByUsername(username)
    if (usernameFound.length !== 0) {
        res.send('USERNAME TAKEN')
        return
    }
};

// Function to check if email is taken 
const checkIfEmailTaken = async (email) => {
    const userFound = await findUserByEmail(email);
    if (userFound.length !== 0) {
        res.send('EMAIL ALREADY IN USE')
        return
    };
}


// Function to update user field

const updateField = async (field, newFieldValue, userId) => {
    try {
        const SQL = `UPDATE users SET ${field}=$1 WHERE id=$2`;
        await pool.query(SQL, [newFieldValue, userId])
        return findUserById(userId);
    } catch (err) {
        console.log(err);
    }
};


// Function to update username

// const updateUsername = async (username, userId) => {
//     try {
//         checkIfUsernameTaken(username);
//         const SQL = 'UPDATE users SET username=$1 WHERE id=$2';
//         await pool.query(SQL, [username, userId])
//         return findUserById(userId);
//     } catch (err) {
//         console.log(err);
//     }
// };

// const updatePassword = async (password, userId) => {
//     try {
//         const SQL = 'UPDATE users SET password=$1 WHERE id=$2';
//         await pool.query(SQL, [password, userId])
//         return findUserById(userId);
//     } catch (err) {
//         console.log(err);
//     }
// };

// // Function to update first name
// const updateFirstName = async (firstName, userId) => {
//     try {
//         const SQL = 'UPDATE users SET first_name=$1 WHERE id=$2';
//         await pool.query(SQL, [firstName, userId])
//         return findUserById(userId);
//     } catch (err) {
//         console.log(err);
//     }
// };
// // Function to update last name 
// const updateLastName = async (lastName, userId) => {
//     try {
//         const SQL = 'UPDATE users SET last_name=$1 WHERE id=$2';
//         await pool.query(SQL, [lastName, userId])
//         return findUserById(userId);
//     } catch (err) {
//         console.log(err);
//     }
// };

// // Function to update telephone
// const updateTelephone = async (telephone, userId) => {
//     try {
//         const SQL = 'UPDATE users SET telephone=$1 WHERE id=$2';
//         await pool.query(SQL, [telephone, userId])
//         return findUserById(userId);
//     } catch (err) {
//         console.log(err);
//     }
// };



/// REFACTOR VALIDATING DATA FUNCTIONS TO USE IN YOUR UPDATE FUNCTION 
// Function to update email (check if email is not taken first)
            //format email to pass into checking function
// Function to update user info
const updateUser = async (req, res) => {    
    const { user } = req.user;
    const { id } = user;
    const { username, password, first_name, last_name, telephone, email } = req.body;
    if (username) {
        validateFieldLength('USERNAME', username, 2, 20);
        checkIfUsernameTaken(username)
        const updatedUser = await updateField('username', username, id);
        res.send(`USERNAME UPDATED TO: ${updatedUser[0].username}`)
    }
    if (password) {
        // PASSWORD STRENGTH; REFER TO DOCUMENTATION WHEN CREATED FRONT END PROMPT
        // if (!validator.isStrongPassword(password)) {
        //     res.send('PASSWORD NOT STRONG ENOUGH');
        // }
        const hashedPassword = passwordHash(password);
        await updateField('password', hashedPassword, id);
        res.send('PASSWORD UPDATED')
    }
    if (first_name) {
        validateFieldLength('FIRST NAME', first_name, 2, 20);
        const updatedUser = await updateField('first_name', first_name, id);
        res.send(`FIRST NAME UPDATED TO: ${updatedUser[0].first_name}`)
    }
    if (last_name) {
        validateFieldLength('LAST NAME', last_name, 2, 20);
        const updatedUser = await updateField('last_name', last_name, id);
        res.send(`LAST NAME UPDATED TO: ${updatedUser[0].last_name}`)

    }
    if (telephone) {
        // ADD PHONE VALIDATOR
        const updatedUser = await updateField('telephone',telephone, id);
        res.send(`TELEPHONE UPDATED TO: ${updatedUser[0].telephone}`)

    } 
    if (email) {
        if (!validator.isEmail(email)) {
            res.send('INVALID EMAIL');
            return
        }
        const formattedEmail = validator.normalizeEmail(email); 
        checkIfEmailTaken(formattedEmail);
        const updatedUser = await updateField('email', formattedEmail, id);
        res.send(`EMAIL UPDATED TO: ${updatedUser[0].email}`);
    }
}
// Exports
module.exports = { passwordHash, findUserByEmail, findUserByUsername, findUserById, updateUser, checkIfUsernameTaken, checkIfEmailTaken, validateFieldLength }