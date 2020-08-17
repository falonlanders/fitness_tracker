const client = require('./client');

//ADD ROUTINE ACTIVITY
async function addRoutineToActivity({ routineId, activityId, count, duration }) {
    try {
        const { rows: [ROUTINE_ACTIVITIES] } = await client.query(`
        INSERT INTO routine_activities("routineId", "activityId", count, duration)
        VALUES ($1, $2, $3, $4);`, [routineId, activityId, count, duration]);
        return ROUTINE_ACTIVITIES;
    } catch (error) {
        console.log("error adding activity to routine", error)
        throw error;
    }
}

//UPDATE ROUTINE ACTIVITIY
async function updateRoutineActivity({ id, count, duration }) {
    try {
        const { rows: [ROUTINE_ACTIVITIES] } = await client.query(`
        UPDATE routine_activities
        SET count = $2
        SET duration = $3
        WHERE id = $1;`, [id, count, duration]);
        return ROUTINE_ACTIVITIES;
    } catch (error) {
        console.log("error updating activity", error)
        throw error;
    }
}

//DESTROY ROUTINE ACTIVITY
async function destroyRoutineActivity({ id }) {
    try {
        const { rows: [ROUTINE_ACTIVITIES] } = await client.query(`
        DELETE FROM routine_activities
        WHERE id = $1;`, [id]);
        return ROUTINE_ACTIVITIES;
    } catch (error) {
        console.log("error destroying activity", error)
        throw error;
    }
}

//GET ALL ROUTINE ACTIVITIES (TEST DB)
async function getAllRoutineActivities() {
    try {
        const { rows } = await client.query(`
        SELECT id, "routineId", "activityId", duration, count
        FROM routine_activities;
      `);

        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addRoutineToActivity,
    updateRoutineActivity,
    destroyRoutineActivity,
    getAllRoutineActivities,
}