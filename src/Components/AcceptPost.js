import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "./Header"
import axios from "axios"
import moment from "moment"
import swal from "@sweetalert/with-react"

const AcceptPost = (props) => {
    const [post, setPost] = useState([])
    const [peeps, setPeeps] = useState([])
    const [currentUser, setUser] = useState("")
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [taken, setTaken] = useState('')

    console.log(props.match.params)

    const id = props.match.params.post_id
    const getData = async () => {
        console.log(id)
        let res = await axios.get(`/api/post/${id}`)
        setPost(res.data)
    }

    useEffect(() => {
        axios.get("/auth/user-data").then((res) => setUser(res.data))
        getData()
        getPeeps()
    }, [taken])
    console.log(post)
    console.log(currentUser)
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

    const takeShift = async () => {
        await axios
            .put(`/api/posts/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log("update error", err))
    }

    const emailPeople = async (email2, first, last, emp_id) => {
        await axios.post("/api/email", {
            email1: currentUser.user_email,
            email2,
            message: `Shift posted by ${currentUser.user_first} ${
                currentUser.user_last
            } employee id ${
                currentUser.user_employee_id
            }, and accepted by ${first} ${last} employee id ${emp_id}`,
        })
        takeShift()
        setTaken(true)
        swal("Awesome!", "An email has been sent to both of you!", "success")
    }

    const getChat = async (acc_user_id) => {
        let res = await axios
            .get(`/api/getChat`, {acc_user_id})
    }

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
                    {!post[0].taken ? (
                        <>
                            <button
                                onClick={() =>
                                    emailPeople(
                                        peeps.acc_user_email,
                                        peeps.acc_first_name,
                                        peeps.acc_last_name,
                                        peeps.acc_emp_id,
                                    )
                                }
                            >
                                Accept
                            </button>
                            <button>Decline</button>
                        </>
                    ) : <span>Shift no longer listed</span>    }
                    <button>Message</button>
                </Mapp>
            </Mapp>
        )
    })


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
    background: #bada55;
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
