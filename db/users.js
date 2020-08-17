const client = require('./client');
const bcrypt = require('bcrypt');

// USER FUNCTIONS
//CREATE USER (USERNAME & PASSWORD)
async function createUser({ username, password }) {
    try {
        const { rows: [name] } = await client.query(`
      INSERT INTO users (username, password) 
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password]);
        return name;
    } catch (error) {
        console.log("error creating user", error)
        throw error;
    }
}

//GET USER (USERNAME & PASSWORD)
async function getUser(username, password) {
    if (!username || !password) {
        return;
    }
    try {
        const { rows: [name] } = await client.query(`
        SELECT username 
        FROM users;
        `, [name]);
        if (!name) return null;
        const bcryptpw = bcrypt.compareSync(password, name.password);
        if (!bcryptpw) return;
        return name;
    } catch (error) {
        console.log("error getting user", error)
        throw error;
    }
};

async function getAllUsers() {
    try {
        const { rows } = await client.query(`
        SELECT id, username, password
        FROM users;
      `);

        return rows;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createUser,
    getUser,
    getAllUsers,
}