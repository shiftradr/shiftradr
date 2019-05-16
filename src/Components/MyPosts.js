import React, { useState, useEffect } from "react"
import Header from './Header'
import styled from "styled-components"
import axios from 'axios'

const MyPosts = (props) => {

    const [post, setPost] = useState([])

    useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
        axios.get("/auth/user-data").then((res) => console.log(res.data))
        let res = await axios.get("/api/user/posts")
        setPost(res.data)
    }

    const deletePost = (id) => {
        const postId = post.post_id    
        axios.delete(`/api/posts/${id}`, postId).then(res => res.data)
    }

    let map = post.map((item, i) => {
        return (
            <PostV key={i}>
                <span>Date:  {item.shift_date}</span>
                <span>{item.memo}</span>
                <span>Incentive:  {item.incentive}</span>
                <Button onClick={deletePost()}>Delete Post</Button>
            </PostV>
        )
    })
    console.log(1111, post)


    return(
        <>
            <Header/>
            <Dash>
                <PostView>
                <Title>My Posts</Title>
                {map}
                </PostView>
            </Dash>
        </>
    )
}
export default MyPosts

const Dash = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8vh;
    height: 92vh;
    width: 100vw;
    background: #10171e;
`

const PostView = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 60%;
    height: 100%;
    background: #15202b;
`

const PostV = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 5vh;
    height: 100px;
    width: 90%;
    background: pink;
    border-radius: 20px;

`

const Button = styled.button`
    background: #8b0000;
    color: white;
    padding: 8px;
    border-radius: 20px;
    outline: none;
    border: none;

`
const Title = styled.h1`
color: white;
font-weight: 700;
`