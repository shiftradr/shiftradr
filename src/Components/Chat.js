import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import sockets from "./Sockets"

const Chat = (props) => {
    const [messages, setMessage] = useState("")

    
    const sendMessage = async (e) => {
        e.preventDefault()
        const { user_id2, room } = props
        if (messages !== "") {
            await sockets.emit("sendMessage", {
                messages,
                user_id: user_id2,
                room,
            })

            setMessage("")
        }

    }

    return (
        
                <Form onSubmit={sendMessage}>
                    <Input
                        onChange={(e) => setMessage(e.target.value)}
                        value={messages}
                        placeholder="Enter Message"
                    />
                    <Button>Send</Button>
                </Form>
    )
}
export default Chat
const Input = styled.input`
    position: sticky;
    bottom: 0px;
    height: 30px;
    width: 80%;
`
const Form = styled.form`
    position: relative;
    bottom: 0%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
    /* height: 100%; */
`
const Button = styled.button`
    position: sticky;
    bottom: -110px;
    height: 30px;
`
// const Box = styled.div`
//     display: flex;
//     flex-direction: row;
//     height: 100%;
//     position: relative;
//     bottom: 0px;

// `
// const ChatBar = styled.div`
//     display: flex;
//     top: 0;
//     left: 0;
//     height: 100vh;
//     width: 10vw;
//     background: black;
// `
// const Messengers = styled.div``
// const ChatRows = styled.div`
//     display: relative;
//     top: 0;
//     right: 0;
//     height: 100vh;
//     width: 90vw;
//     background: grey;
// `
// const ChatLines = styled.div`
//     display: relative;
//     height: 15px;
//     width: 90vw;
//     border-bottom: 0.5px solid black;
// `
