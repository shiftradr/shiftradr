import React, { useState } from "react"
import styled from "styled-components"
import Header from "./Header"

const Dashboard = () => {
    return (
        <>
            <Header />
            <Dash>
                <PostView />
            </Dash>
        </>
    )
}

export default Dashboard

const Dash = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8vh;
    height: 92vh;
    width: 100vw;
   
`
const PostView = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    background: pink;
`
