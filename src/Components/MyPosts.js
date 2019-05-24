import React, { useState, useEffect } from "react"
import Header from "./Header"
import styled from "styled-components"
import axios from "axios"
import moment from "moment"
import { Link } from "react-router-dom"
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
        await axios
            .put(`/api/posts/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log("update error", err))
        getData()
    }

    const archive = async (id) => {
        await axios
            .put(`/api/posts/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log("update error", err))
        await axios
            .put(`/api/archive/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log("archive error", err))
        getData()
    }

    let map = post.map((item, i) => {
        let time = moment(item.post_date).fromNow()
        let date = moment(item.shift_date).format("dddd, MMMM Do, YYYY")
        return (
            <PostV key={i}>
                <PostLink to={`/accept_post/${item.post_id}`}>
                    <span
                        style={{
                            borderBottom: "1px solid #fff",
                            fontSize: "1.5rem",
                            marginBottom: "10px",
                        }}
                    >
                        {date}
                    </span>
                    <span>{item.memo}</span>
                    {item.incentive ? (
                        <span>Incentive: {item.incentive}</span>
                    ) : null}
                    <span>Posted {time}</span>
                </PostLink>
                <Buttons>
                    {!item.taken ? (
                        <Button onClick={() => takeShift(item.post_id)}>
                            Remove Post
                        </Button>
                    ) : (
                        <Spann>No Longer Listed</Spann>
                    )}
                    <Button
                        onClick={() =>
                            swal({
                                title: "Are you sure?",
                                text:
                                    "Are you sure that you want to leave this page?",
                                icon: "warning",
                                dangerMode: true,
                                buttons: {
                                    cancel: "Cancel",
                                    success: "Archive",
                                },
                            }).then((willDelete) => {
                                if (willDelete) {
                                    archive(item.post_id)
                                }
                            })
                        }
                    >
                        Archive
                    </Button>
                </Buttons>
            </PostV>
        )
    })

    return (
        <>
            <Header />
            <Dash>
                <Title>My Posts</Title>
                <PostView>{map}</PostView>
            </Dash>
        </>
    )
}
export default MyPosts

const Spann = styled.span`
    /* background: #ff715b; */
    border-bottom: 1px solid #ff715b;
    color: #ff715b;
    /* border-radius: 15px;
    padding: 6px; */
`

const Dash = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 8vh;
    height: 92vh;
    width: 100vw;
    background: #10171e;
`

const PostView = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    /* background: #C9CBCB; */
    background-position: fixed;
    overflow: scroll;
    background-image: linear-gradient(
        to left,
        #509aaa,
        #6fa5b0,
        #8bb1b6,
        #a6bcbe,
        #a6bcbe,
        #a6bcbe,
        #a6bcbe,
        #a6bcbe,
        #a6bcbe,
        #a6bcbe,
        #a6bcbe,
        #a6bcbe,
        #8bb1b6,
        #6fa5b0,
        #509aaa
    );

    &::-webkit-scrollbar {
        display: none;
    }
`

const PostV = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 5vh;
    height: 200px;
    width: 530px;
    padding: 10px;
    text-align: center;
    background: #4b5358;
    border-radius: 15px;
    margin: 20px;
    background-image: linear-gradient(
        to right bottom,
        #4b5358,
        #53585d,
        #5a5d63,
        #626267,
        #69686c,
        #706e72,
        #787378,
        #80797e,
        #8b7f87,
        #97868f,
        #a38c96
    );
`

const Button = styled.button`
    background: #fff;
    border: 2px solid #ff715b;
    color: #ff715b;
    padding: 8px;
    border-radius: 20px;
    outline: none;
    &:hover {
        background: #ff715b;
        color: #fff;
    }
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    width: 70%;
`

const Title = styled.h1`
    color: white;
    position: absolute;
    top: -13px;
    z-index: 100;
    left: 250px;
    font-weight: 300;
`

const PostLink = styled(Link)`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 140px;
    width: 80%;
    border-radius: 20px;
`
