//CLIENT REQUIRES POSTGRESS
const { Client } = require('pg');
//SUPPLIES THE DB NAME AND LOCATION OF THE DATABASE
const client = new Client('https://localhost:5432/fitness');
const bcrypt = require('bcrypt');
const express = require('express');
const { updateRoutineActivity, destroyRoutineActivity } = require('../db');
const token = require('jsonwebtoken');
const salt = 10;
const routineActivitiesRouter = express.Router();

// PATCH /ROUTINE_ACTIVITIES/:ROUTINEACTIVITYID(**)
router.patch('/:routineActivityId', async (req, res, next) => {
    try {
        const { count, duration } = req.body;
        const UPDATED = await updateRoutineActivity({ count, duration })
        res.sent(UPDATED);
        console.log(UPDATED);
    } catch (error) {
        console.log("update routine error duration/count", error)
        next(error);
    }
});

// DELETE /ROUTINE_ACTIVITIES/ROUTINEACTIVITYID(**)
router.delete('/:routineActivityId', async (req, res, next) => {
    try {
        const DELETE = await destroyRoutineActivity(req.params.routineId);
        (DELETE && DELETE.creatorId === req.user.id) {
            const DELETEconfirmed = await destroyRoutineActivity(routine.id);
            res.send({ DELETE: DELETEconfirmed });
            console.log(DELETE);
            console.log(DELETEconfirmed);
        }
    } catch (error) {
        console.log("delete activity error", error);
        next(error)
    }
});

module.exports = routineActivitiesRouter;