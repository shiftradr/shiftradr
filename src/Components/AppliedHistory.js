import React, { useState, useEffect } from "react"
import Header from './Header'
import styled from "styled-components"
import axios from 'axios'
import moment from 'moment'
import {Link} from 'react-router-dom'

const AppliedHistory = (props) => {

    const [post, setPost] = useState([])

    useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
        let res = await axios.get("/api/applied-for")
        setPost(res.data)
    }
    console.log(11111, post)

    // const deletePost = async (id) => {   
    //     await axios.delete(`/api/posts/${id}`).then(res => res.data).catch(err => console.log('delete error', err))
    //     getData()
    // }

    // const takeShift = async (id) => {
    //     await axios.put(`/api/posts/${id}`).then(res => res.data).catch(err => console.log('update error', err))
    //     getData()
    // }

    let map = post.map((item, i) => {
        let time = moment(item.post_date).fromNow()
        let date = moment(item.shift_date).format('dddd, MMMM Do, YYYY')
        return (
            <PostV to={`/applied-for-post/${item.post_id}`} key={i}>
                <span>{date}</span>
                <span>{item.memo}</span>
                {item.incentive ? (
                <span>Incentive: {item.incentive}</span>
                ) : null }
                <span>Posted {time}</span>
            </PostV>
        )
    })

    return(
        <>
            <Header/>
            <Dash>
                <PostView>
                <Title>Posts I've Applied For</Title>
                {map}
                </PostView>
            </Dash>
        </>
    )
}
export default AppliedHistory

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
    background: lightseagreen;
    border-radius: 20px;

`

// const Button = styled.button`
//     background: #8b0000;
//     color: white;
//     padding: 8px;
//     border-radius: 20px;
//     outline: none;
//     border: none;
// `
const Title = styled.h1`
    color: white;
    font-weight: 700;
`