import io from 'socket.io-client'

const sockets = io('ws://192.168.1.59:4444', {transports: ['websocket']})

export default sockets