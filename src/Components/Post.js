import React from "react"
import Header from "./Header"
import styled from "styled-components"

const Search = () => {
    return (
        <>
            <Header />
            <PostView>
                <Input type='date' />
                <Input placeholder='' type='time' />
                <Input placeHolder='' />
            </PostView>
        </>
    )
}

export default Search

const PostView = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8vh;
    height: 92vh;
    width: 100vw;
`

const Input = styled.input`
    display: flex;
    height: 20px;
    width: 100px;
    margin: 10px;
    border: none;
    outline: none;
    border-bottom: 0.5px solid black;
`
