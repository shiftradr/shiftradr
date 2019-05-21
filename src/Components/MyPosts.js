import React, { useState, useEffect } from "react"
import Header from './Header'
import styled from "styled-components"
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import swal from "@sweetalert/with-react"

const MyPosts = (props) => {

    const [post, setPost] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let res = await axios.get("/api/user/posts")
        setPost(res.data)
    }

    // const deletePost = async (id) => {   
    //     await axios.delete(`/api/posts/${id}`).then(res => res.data).catch(err => console.log('delete error', err))
    //     getData()
    // }

    const takeShift = async (id) => {
        await axios.put(`/api/posts/${id}`).then(res => res.data).catch(err => console.log('update error', err))
        getData()
    }

    const archive = async (id) => {
        await axios.put(`/api/archive/${id}`).then(res => res.data).catch(err => console.log('archive error', err))
        getData()
    }



    let map = post.map((item, i) => {
        let time = moment(item.post_date).fromNow()
        let date = moment(item.shift_date).format('dddd, MMMM Do, YYYY')
        return (
            <>
                <PostV to={`/accept_post/${item.post_id}`} key={i}>
                    <span>{date}</span>
                    <span>{item.memo}</span>
                    {item.incentive ? (
                        <span>Incentive: {item.incentive}</span>
                    ) : null}
                    <span>Posted {time}</span>
                    {!item.taken ? (
                        <Button onClick={() => takeShift(item.post_id)}>Remove Post</Button>
                    ) : <span>No Longer Listed</span>}
                </PostV>
                <Button onClick={() => swal({
                    title: "Are you sure",
                    text: "This will permanently remove your post",
                    icon: "warning",
                    dangerMode: true,
                    buttons: true
                })}>Test</Button>
                <Button onClick={() => archive(item.post_id)} >Archive</Button>
            </>
        )
    })

    return (
        <>
            <Header />
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
    background-position: fixed;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

`

const PostV = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 5vh;
    height: 140px;
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