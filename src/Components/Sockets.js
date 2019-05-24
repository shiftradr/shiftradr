import io from 'socket.io-client'
require("dotenv").config()



const sockets = io(process.env.SOCKET_IP, {transports: ['websocket']})

export default sockets