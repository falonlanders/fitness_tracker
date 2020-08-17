const { getAllRoutineActivities, getAllRoutines,
    getAllUsers, getAllActivities, createUser,
    createActivity, createRoutine,
    addRoutineToActivity } = require('./');
const client = require('./client');

async function dropDaTables() {
    try {
        console.log("starting droptables..");
        await client.query(`
    DROP TABLE IF EXISTS routine_activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS users;
    `);
        console.log("finished dropping tables");
    } catch (error) {
        console.error("error dropping tables", error);
        throw error;
    }
}

async function createDaTables() {
    try {
        console.log("startin creat mf tables");
        await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR (255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        `)
        await client.query(`
        CREATE TABLE activities(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL
        );
        `)
        await client.query(`
        CREATE TABLE routines(
            id SERIAL PRIMARY KEY,
            "creatorId" INTEGER REFERENCES users(id),
            public BOOLEAN DEFAULT false,
            name VARCHAR(255) UNIQUE NOT NULL,
            goal TEXT NOT NULL
        );
        `)
        await client.query(`
        CREATE TABLE routine_activities(
            id SERIAL PRIMARY KEY,
            "routineId" INTEGER REFERENCES routines(id),
            "activityId" INTEGER REFERENCES activities(id),
            duration INTEGER,
            count INTEGER,
            UNIQUE ("routineId", "activityId")
        );
        `)
        console.log("finished creating mf tables");
    } catch (error) {
        console.error("error creating tables", error);
        throw error;
    }
}

async function createInitialUsers() {
    console.log("starting to create initial users (seed.js)")
    try {
        await createUser({
            username: 'iFalon',
            password: 'zalgiris'
        });
        await createUser({
            username: 'ugaFan',
            password: 'goDawgs'
        });
        await createUser({
            username: 'DonnaK',
            password: 'ilovecats'
        });
        console.log("finished creating initial users");
    } catch (error) {
        console.log("error creating initial users", error);
        throw error;
    }
}

async function createInitialActivities() {
    console.log("starting to create initial activities (seed.js)")
    try {
        await createActivity({
            name: 'Abs',
            activity: 'Crunches',
            description: "exercise yay"
        });
        await createActivity({
            name: 'Legs',
            activity: 'Squats',
            description: "exercise yay"
        });
        await createActivity({
            name: 'Arms',
            activity: 'Push Ups',
            description: "exercise yay"
        });
        console.log("finished creating initial activities");
    } catch (error) {
        console.log("error creating initial activities mf", error)
        throw error;
    }
}


async function createInitialRoutines() {
    console.log("starting to create initial routines (seed.js)")
    try {
        await createRoutine({
            creatorId: 1,
            public: false,
            name: "Workout 1",
            goal: "Thinner Thighs"
        });
        await createRoutine({
            creatorId: 2,
            public: true,
            name: "Workout 2",
            goal: "Jacked up arms yo"
        });
        await createRoutine({
            creatorId: 3,
            public: false,
            name: "Workout 3",
            goal: "Flatter Abs"
        });
        console.log("fished creating initial routines");
    } catch (error) {
        console.log("error creating initial routines", error)
        throw error;
    }
}

async function createInitialRoutineActivities() {
    console.log("starting to create initial routine activities (seed.js)")
    try {
        await addRoutineToActivity({
            routineId: 1,
            activityId: 1,
            public: false,
            count: 10,
            duration: 100
        });
        await addRoutineToActivity({
            routineId: 2,
            activityId: 2,
            public: true,
            count: 5,
            duration: 90
        });
        await addRoutineToActivity({
            routineId: 3,
            activityId: 3,
            public: false,
            count: 20,
            duration: 80
        });
        console.log("finished creating initial routine activities");
    } catch (error) {
        console.log("error creating initial routine activities", error)
        throw error;
    }
}

//REBUILD DB
async function rebuildDB() {
    try {
        client.connect();
        await dropDaTables();
        await createDaTables();
        await createInitialUsers();
        await createInitialActivities();
        await createInitialRoutines();
        await createInitialRoutineActivities();
    } catch (error) {
        console.log("error creating rebuild db", error);
        throw error;
    }
};

//REBUILD DB
rebuildDB()
    .then(testDB)
    .finally(() => {
        client.end();
    });


async function testDB() {
    try {
        console.log("Starting to test database...");
        //GET ALL ACTIVITIES
        console.log("Calling get all activities..");
        const activities = await getAllActivities();
        console.log("Result:", activities);

        //GET USER
        console.log("get all users..");
        const users = await getAllUsers();
        console.log("Result:", users);

        //GET ALL ROUTINES
        console.log("get all routines..");
        const routines = await getAllRoutines();
        console.log("Result:", routines);

        //GET ALL ROUTINE ACTIVITIES
        console.log("get all routines activities..");
        const routinesAct = await getAllRoutineActivities();
        console.log("Result:", routinesAct);

        console.log("Finished database tests!");
    } catch (error) {
        console.log("Error during testDB");
        throw error;
    }
}


