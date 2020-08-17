//CLIENT REQUIRES POSTGRESS
const { Client } = require('pg');
//SUPPLIES THE DB NAME AND LOCATION OF THE DATABASE
const client = new Client('https://localhost:5432/fitness');
//EXPORT DB
module.exports = client;