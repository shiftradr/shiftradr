require ('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controller/authCtrl')


const app = express()
const{SERVER_PORT, CONNECTION_STRING, SESSION_SECRET,NODE_ENV} = process.env
app.use(express.json())
app.use(express.static(`${__dirname}/../build`));

massive(CONNECTION_STRING)
    .then((db) => {
        app.set('db', db)
        console.log('DB Set')
        if(NODE_ENV === 'development'){
            db.seed([
                '$2a$10$i4TZJiK40ZsdYy/szMLBg.6Ka4Ewu1PGpHWuC90PHIKo9Dj3WXqB2',
                '$2a$10$dls2wI0Dklomj8Tz/we1gOWVx5yFA2KKUag1HTsyzslJ3NYVOANfW',
                '$2a$10$vLWE5c8vXz6n4KtwPFuS4eveGTutntCHyCYIJaOTLXo5W7a7ziNBu',
                '$2a$10$xDz4tFDJPi4oN9naL6ovYesTT2B6amvrwivYh4eVRz/0WNxxU7vOW'
                
             ]).then(() => {
                 console.log('DB Seeded')
            })
        }
app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))
    })

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/user-data', authCtrl.userData)

// post get
app.get('/api/posts', authCtrl.getPosts)

// post create
app.post('/api/posts', authCtrl.createPost)

// post delete
app.delete('/api/posts/:id', authCtrl.deletePost)

// get all posts for a specific user, will use this list to delete
app.get('/api/user/posts', authCtrl.getPostsByUser)

//marking a post as taken
app.put('/api/posts/:id', authCtrl.markTaken)

// get post by id
app.get('/api/post/:id', authCtrl.getPostById)

// accept a post
app.put('/api/post/:id', authCtrl.accPost)

// get intersted people
app.get('/api/interested/:id', authCtrl.interested)