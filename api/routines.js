//CLIENT REQUIRES POSTGRESS
const { Client } = require('pg');
//SUPPLIES THE DB NAME AND LOCATION OF THE DATABASE
const client = new Client('https://localhost:5432/fitness');
const bcrypt = require('bcrypt');
const express = require('express');
const { getAllPublicRoutines, createRoutine, getRoutineById, destroyRoutine, updateRoutine, addActivitiesToRoutine, getActivityById } = require('../db');
const routinesRouter = express.Router();
const token = require('jsonwebtoken');
const salt = 10;


// GET /ROUTINES
router.get('/', async (res, next) => {
    try {
        const ROUTINES = await getAllPublicRoutines();
        res.send(ROUTINES);
        console.log(ROUTINES);
    } catch (error) {
        console.log("get public routines error", error);
        next(error)
    }
})

//POST /ROUTINES(*)
router.post('/', async (req, res, next) => {
    try {
        const { name, goal } = req.body;
        const CREATED = await createRoutine({ creatorId, public, name, goal });
        res.send(CREATED);
        console.log(CREATED)
    } catch (error) {
        console.log("create routine error", error);
        next(error);
    }
});

// PATCH /ROUTINES/ROUTINEID
router.patch('/:routineId', async (req, res, next) => {
    try {
        const { name, goal } = req.body;
        const UPDATED = await updateRoutine({ id, public, name, goal })
        res.send(UPDATED);
        console.log(UPDATED);
    } catch (error) {
        console.log("updating routine error", error);
        next(error);
    }
});

// DELETE /ROUTINES/ROUTINEID
router.delete('/:routineId', async (req, res, next) => {
    try {
        const DELETE = await getRoutineById(req.params.routineId);
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

// POST /ROUTINES/:ROUTINEID/ACTIVITIES
router.post('/:routineId/activities', async (req, res, next) => {
    try {
        const { routineId, activityId, count, duration } = req.body;
        const ATTACH = await addActivityToRoutine({ routineId, activityId, count, duration });
        res.send(ATTACH)
        console.log(ATTACH);
    } catch (error) {
        console.log("Attach activity error", error);
        next(error);
    }
});

module.exports = routinesRouter;