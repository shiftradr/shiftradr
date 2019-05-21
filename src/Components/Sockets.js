import io from 'socket.io-client'

const sockets = io('ws://localhost:4444', {transports: ['websocket']})

export default sockets