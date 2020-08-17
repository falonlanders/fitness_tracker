const client = require('./client')

//SELECTS & RETURNS AN ARRAY OF ALL ROUTINES, INCLUDING THEIR ACTIVITIES
async function getAllRoutines() {
    try {
        const { rows: ROUTINES } = await client.query(`
    SELECT * FROM routines
    `);
        return ROUTINES;
    } catch (error) {
        console.log("error getting routines", error)
        throw error;
    }
}

//SELECT AND RETURN AN ARRAY OF PUBLIC ROUTINES, INCLUDING THEIR ACTIVITIES
async function getPublicRoutines() {
    try {
        const { rows: ROUTINES } = await client.query(`
    SELECT * FROM routines
    WHERE public = true
    `);
        return ROUTINES;
    } catch (error) {
        console.log("error getting public routines", error)
        throw error;
    }
}

//SELECT AND RETURNS AN ARRAY OF ROUTINES MADE BY USER INCLUDING THEIR ACTIVITIES
async function getAllRoutinesByUser({ username }) {
    try {
        const { rows: ROUTINES } = await client.query(`
    SELECT * FROM routines 
    WHERE "creatorId" = $1
    `, [username]);
        return ROUTINES;
    } catch (error) {
        console.log("error getting routines by user", error)
        throw error;
    }
}

//SELECT AND RETURNS AN ARRAY OF PUBLIC ROUTINES MADE BY USER INCLUDING THEIR ACTIVITIES
async function getPublicRoutinesByUser({ username }) {
    try {
        const { rows: ROUTINES } = await client.query(`
    SELECT * FROM routines
    WHERE "creatorId" = $1
    AND public = true
    `, [username]);
        return ROUTINES;
    } catch (error) {
        console.log("error getting public routines by user", error)
        throw error;
    }
}

//SELECT AND RETURN AN ARRAY OF PUBLIC ROUTINES WHICH HAVE SPECIFIC ACTIVITY ID
async function getPublicRoutinesByActivity({ activityId }) {
    try {
        const { rows: ROUTINES } = await client.query(`
    SELECT * FROM routines 
    JOIN routine_activities ON routine_activities."routineId" = routines.id
    WHERE routines.public = true
    AND routine_activities."activityId" = $1;
  `, [activityId]);
        return ROUTINES;
    } catch (error) {
        console.log("error getting public routines by activity", error)
        throw error;
    }
}

//CREATES NEW ROUTINE (CREATOR ID, PUBLIC, IS PUBLIC, NAME, GOAL)
async function createRoutine({ creatorId, public, name, goal }) {
    try {
        const { rows: [ROUTINES] } = await client.query(`
        INSERT INTO routines ("creatorId", public, name, goal)
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `, [creatorId, public, name, goal]);

        return ROUTINES;
    } catch (error) {
        console.log("error creating routine", error)
        throw error;
    }
}

//SATURDAY HELP WHAT TO PUT IN ?
//RETURNED UPDATED ROUTINE
async function updateRoutine({ id, public, name, goal }) {
    try {
        const { rows: [ROUTINES] } = await client.query(`
          UPDATE routines
          
          `, [id, public, name, goal]);
        return ROUTINES;
    } catch (error) {
        console.log("error updating routine", error)
        throw error;
    }
}

//REMOVES THE ROUTINE FROM THE DATABASE
async function destroyRoutine(id) {
    try {
        await client.query(`
        DELETE FROM routine_activities
        WHERE "routineId" = $1;
    `, [id]);
        const { rows: [ROUTINES] } = await client.query(`
        DELETE FROM routines
        WHERE id = $1
        RETURNING *
    `, [id]);
        return ROUTINES;
    } catch (error) {
        console.log("error destroying routine", error)
        throw error;
    }
}

module.exports = {
    getAllRoutines,
    getPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
    destroyRoutine,
}