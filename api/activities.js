//CLIENT REQUIRES POSTGRESS
const { Client } = require('pg');
//SUPPLIES THE DB NAME AND LOCATION OF THE DATABASE
const client = new Client('https://localhost:5432/fitness');
const bcrypt = require('bcrypt');
const express = require('express');
const { updateActivity, getPublicRoutinesByActivity, getAllActivities, createActivity } = require('../db');
const activitiesRouter = express.Router();
const token = require('jsonwebtoken');
const salt = 10;

// GET /ACTIVITIES
activitiesRouter.get('/', async (res, next) => {
    try {
        const activities = await getAllActivities();
        res.send(activities);
    } catch (error) {
        console.log("api get activities error activities.js", activities, error);
        next(error)
    }
})

// POST /ACTIVITIES
activitiesRouter.post('/', username, async (req, res, next) => {
    try {
        const { name, description } = req.body
        const ACTIVITIY = await createActivity({ name, description });
        console.log('this is the poast name & description (api activities.js)', name, description)
        res.send(ACTIVITIY)
    } catch (error) {
        console.log('error in post activities activities.js api', error);
        next(error);
    }
});

// PATCH /ACTIVITIES/:ACTIVITYID
activitiesRouter.patch('/:activityId', username, async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const UPDATE = await updateActivity({ id: req.params.activityId, name, description })
        res.send(UPDATE);
        console.log('UPDATE ACTIVITIES RESULTS activities.js api', UPDATE)
    } catch (error) {
        console.log('error in update activities activities.js api', error);
        next(error);
    }
});

// GET /ACTIVITIES/:ACTIVITIYID/ROUTINES
activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
    try {
        const ROUTINES = await getPublicRoutinesByActivity({ id: req.params.activityId });
        res.send(ROUTINES);
        console.log('PUBLIC ROUTINES activities.js api', ROUTINES)
    } catch (error) {
        console.log('error in public routines activities.js api', error);
        next(error);
    }
});

module.exports = activitiesRouter;