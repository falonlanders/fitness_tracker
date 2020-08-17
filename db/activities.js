const client = require('./client');

// RETURNS AN ARRAY OF ALL ACTIVITIES (TESTDB)
async function getAllActivities() {
    try {
        const { rows: ACTIVITY } = await client.query(`
      SELECT * FROM activities;
    `);
        return ACTIVITY;
    } catch (error) {
        console.log("error getting activities", error)
        throw error;
    }
}

// CREATES & RETURNS THE NEW ACTIVITY 
async function createActivity({ name, description }) {
    console.log("starting create activity...");
    try {
        const { rows: [ACTIVITY] } = await client.query(`
      INSERT INTO activities(name, description) VALUES ($1, $2)
      ON CONFLICT (name) DO NOTHING 
      RETURNING *
    `, [name, description]);
        return ACTIVITY;
    } catch (error) {
        console.log("error creating activity", error)
        throw error;
    }
}

// RETURN THE NEW UPDATED ACTIVITY
async function updateActivity({ id, name, description }) {
    try {
        const { rows: [ACTIVITIES] } = await client.query(`
        UPDATE activities
        SET count = $2
        SET duration = $3
        WHERE id = $1;` [id, name, description]);
        return ACTIVITIES;
    } catch (error) {
        console.log("error updating activity", error)
        throw error
    }
}

module.exports = {
    getAllActivities,
    createActivity,
    updateActivity,
}