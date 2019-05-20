import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import axios from 'axios'

const Chat = () => {
    const inputRef = useRef()

    useEffect(() => {

    })

    const getChat = () => {

    }

    const sendMessage = () => {

    }

    return (
        <>
            <Box>
                <Form onSubmit={sendMessage}>
                    <Input ref={inputRef} placeholder="Enter Message" />
                    <Button>Send</Button>
                </Form>
            </Box>
        </>
    )
}



export default Chat

const Input = styled.input`
    position: relative;
    top: 71.2vh;
    height: 30px;
    width: 80%;
`
const Form = styled.form`
    display: flex;
    flex-direction: row;
    width: 100%;

`

const Button = styled.button`
    position: relative;
    top: 71.2vh;
    height: 30px;
`

const Box = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`

const ChatBar = styled.div`
    display: flex;
    top: 0;
    left: 0;
    height: 100vh;
    width: 10vw;
    background: black;
`

const Messengers = styled.div``

const ChatRows = styled.div`
    display: relative;
    top: 0;
    right: 0;
    height: 100vh;
    width: 90vw;
    background: grey;
`

const ChatLines = styled.div`
    display: relative;
    height: 15px;
    width: 90vw;
    border-bottom: 0.5px solid black;
`
