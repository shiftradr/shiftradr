import React from "react"
import styled from "styled-components"

const Post = (props) => {
    return (
        <>
            <PostView>
                <h5>{props.map}</h5>
            </PostView>
        </>
    )
}

export default Post

const PostView = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8vh;
    height: 100px;
    width: 90%;
    background: pink;
`

// const Input = styled.input`
//     display: flex;
//     height: 20px;
//     width: 100px;
//     margin: 10px;
//     border: none;
//     outline: none;
//     border-bottom: 0.5px solid black;
// `
