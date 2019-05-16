import React from "react"
import styled from "styled-components"
import Header from "./Header"

const Chat = () => {
    return (
        <>
            <Header />
            <ChatBar>
                <Messengers />
            </ChatBar>
            <ChatLines />
        </>
    )
}

export default Chat

const ChatBar = styled.div`
    display: relative;
    left: 0px;
    width: 50vw;
    background: black;
`

const Messengers = styled.div``

const ChatLines = styled.div``
