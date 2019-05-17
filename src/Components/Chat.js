import React from "react"
import styled from "styled-components"
import Header from "./Header"

const Chat = () => {
    return (
        <>
            <Header />
<<<<<<< HEAD
            <Box>
            <ChatBar >
                <Messengers>

                </Messengers>
            </ChatBar>
            <ChatRows>
                <ChatLines />
            </ChatRows>
            </Box>
=======
            <ChatBar>
                <Messengers />
            </ChatBar>
            <ChatLines />
>>>>>>> master
        </>
    )
}

export default Chat

const Box = styled.div`
    display: flex;
    flex-direction: row;
`

const ChatBar = styled.div`
    display: flex;
    top: 0;
    left: 0;
    height: 100vh;
    width: 10vw;
    background: black;
`

<<<<<<< HEAD
const Messengers = styled.div`
    
`

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
    bottom-border: .5px solid black;
`
=======
const Messengers = styled.div``

const ChatLines = styled.div``
>>>>>>> master
