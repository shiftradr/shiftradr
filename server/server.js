require ('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controller/authCtrl')
const nodemailer = require('nodemailer')


const app = express()
const{SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, NODE_ENV, MAIL_USER, MAIL_PASSWORD, FROM} = process.env
app.use(express.json())
app.use(express.static(`${__dirname}/../build`));


// ***** NODEMAILER ***** 
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    }
})
// **********************************




// const server = require('http').Server(app)
// var io = require('socket.io')(server)
// server.listen(SERVER_PORT, () => {
//     console.log(`Listening on ${SERVER_PORT}`)
// })


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
// app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))
    })

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

// ***** NODEMAILER POST *****

app.post('/api/email', (req, res) => {
    console.log (req.body)
    const {  message, email1, email2 } = req.body
    console.log( message, email1, email2)
    const mailOptions = {
        from: FROM,
        to: `${email1}, ${email2}`,
        subject: `Important: email from Shiftradr `,
        text: `${message}`

    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
        else {
            console.log(info)
            res.sendStatus(200)
        }
    })
})

// **********************************


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

// get history of posts i've applied for
app.get('/api/applied-for', authCtrl.appliedHistory)

// route to a specific post in my applied history
app.get('/api/applied-post/:id', authCtrl.appliedPost)

app.put('/api/archive/:id', authCtrl.archive)

// Chat Endpoints
const sockCtrl = require("./controller/SocketsController")
app.post('/api/getChat', sockCtrl.getChat)

// Sockets
const socket = require('socket.io')
const io = socket (
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on ${SERVER_PORT}`)
    })
)

// Socket Endpoints
io.on("connection", function(socket) {
    socket.on("endChat", function(room) {
        socket.leave(room)
    })

    socket.on("startChat", async function(room) {
        const db = app.get("db")
        const checkedRoom = await db.check_room({ room })
        !checkedRoom[0] && (await db.create_room({ room }))
        const messages = await db.get_chats({ room })
        socket.join(room)
        io.to(room).emit("returnJoin", messages)
    })

    socket.on("sendMessage", async function(data) {
        const db = app.get("db")
        const { messages, user_id, room } = data
        const message = await db.create_message({ messages, user_id, room })
        io.to(room).emit("returnMessages", message)
    })
})
