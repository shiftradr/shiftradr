import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "./Header"
import axios from "axios"
import moment from "moment"
import swal from "@sweetalert/with-react"

const AcceptPost = (props) => {
    const [post, setPost] = useState([])
    const [peeps, setPeeps] = useState([])

    console.log(props.match.params)

    const id = props.match.params.post_id
    const getData = async () => {
        console.log(id)
        let res = await axios.get(`/api/post/${id}`)
        setPost(res.data)
    }

    useEffect(() => {
        getData()
        getPeeps()
    }, [])
    console.log(post)

    let mappyboi = post.map((item, i) => {
        let time = moment(item.post_date).fromNow()
        const date = moment(post.shift_date).format("dddd, MMMM Do, YYYY")
        console.log(item.post_id)
        return (
            <Mapp key={i}>
                <h2>{date}</h2>
                {item.incentive ? (
                    <span>Incentive: {item.incentive}</span>
                ) : null}
                <span>Clock In: {item.start_time}</span>
                <span>Posted {time}</span>
            </Mapp>
        )
    })

    const getPeeps = async () => {
        console.log(id)
        let res = await axios.get(`/api/interested/${id}`)
        console.log(res.data)
        setPeeps(res.data)
    }
    console.log(7397489432897, peeps)

    let mapped = peeps.map((peeps, i) => {
        return (
            <Mapp key={i}>
                <Mappy>
                    <span>
                        {peeps.acc_first_name} {peeps.acc_last_name}
                    </span>
                    <span>{peeps.acc_emp_id}</span>
                </Mappy>
                    <Mapp>
                        <button>Accept</button>
                        <button>Decline</button>
                        <button>Message</button>
                    </Mapp>
            </Mapp>
        )
    })

    const acceptPost = async () => {
        let res = await axios
            .put(`/api/post/${id}`)
            .catch((err) => console.log("bobby", err))

        if (res.data.goodMessage) {
            swal(
                "Request Sent!",
                "Please wait for poster's response!",
                "success",
            )
        } else if (res.data.message) {
            swal(
                "Request Failed!",
                "You've already asked for this shift.",
                "error",
            )
        }
    }

    return (
        <>
            <Header />
            <Dash>
                <PostView>
                    <PostH>{mappyboi}</PostH>
                    <Divv>
                        <Posts>{mapped}</Posts>
                        <ChatBox />
                    </Divv>
                </PostView>
            </Dash>
        </>
    )
}

export default AcceptPost

const PostH = styled.div`
    width: 91%;
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: pink;
`

const Mapp = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    background: #BADA55;
`

const Mappy = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100px;
`

const Posts = styled.div`
    height: 76vh;
    width: 26vw;
    background: pink;
    position: relative;
    top: 10px;
`
const ChatBox = styled.div`
    height: 76vh;
    width: 26vw;
    background: pink;
    position: relative;
    top: 10px;
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
    justify-content: space-evenly;
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
const Divv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: space-evenly;
    width: 100%;
`
