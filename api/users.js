//CLIENT REQUIRES POSTGRESS
const { Client } = require('pg');
//SUPPLIES THE DB NAME AND LOCATION OF THE DATABASE
const client = new Client('https://localhost:5432/fitness');
const bcrypt = require('bcrypt');
const express = require('express');
const { createUser, getUserByUsername, getPublicRoutinesByUser } = require('../db');
const userRouter = express.Router();
const token = require('jsonwebtoken');
const salt = 10;

// POST /USERS/REGISTER REQUIRE USER AND PASS
//PASS MUST BE 8 CHARS LONG WITH ERRORS IF TOO SHORT
userRouter.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            next({
                name: 'UsernameError',
                message: 'A user with that username already exists fool'
            });
        } else if (password.length < 8) {
            next({
                name: 'PasswordError',
                message: 'Password is too short! Whoopsies!'
            });
        } else {
            bcrypt.hash(password, salt, async function (hashed) {
                console.log('existingUser', hashed);
                const user = await createUser({
                    username,
                    password: hashed
                });
                if (error) {
                    next(error);
                } else {

                    res.send({
                        message: "Thank you & Welcome New User!!",
                        user
                    });
                }
            });
        }
    } catch (error) {
        console.log("register new user error", error)
        next(error)
    }
})

//POST /USERS/LOGIN 
//KEEPS ID & USERNAME IN THE TOKEN
userRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        next({
            name: 'Password&UserNameError',
            message: 'Provide both a Password & Username Please & Thank you!'
        });
    }
    try {
        const user = await getUser({ username, password });
        if (!user) {
            next({
                name: 'WrongLoginError',
                message: 'Username or password does not match, please try again',
            })
        } else {
            const newToken = token.sign({
                id: user.id,
                username,
            });
            res.send({ message: "Successful Login!!!!", newToken, user });
        };
    } catch (error) {
        console.log("login user error", error)
        next(error);
    }
});

//GET /USERS/:USERNAME/ROUTINES
//LIST OF PUBLIC ROUTINES FOR A PARTICULAR USER
userRouter.get('/:username/routines', async (req, res, next) => {
    const { username } = req.body;
    try {
        const routinesByUsername = await getPublicRoutinesByUser(username);
        res.send(routinesByUsername);
    } catch (error) {
        console.log("routines by username error", error)
        next(error)
    }
})

module.exports = userRouter;
