import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "./Header"
import axios from "axios"
import moment from "moment"
import swal from "@sweetalert/with-react"
import Chat from './Chat'

const Post = (props) => {
    const [post, setPost] = useState([])
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [user_id, setUser_id] = useState("")


    const id = props.match.params.post_id
    const getData = async () => {
        let res = await axios.get(`/api/post/${id}`)
        setPost(res.data)
        setUser_id(res.data[0].user_id)
    }

    useEffect(() => {
        getData()
    }, [])

    let mappyboi = post.map((item, i) => {
        let time = moment(item.post_date).fromNow()
        const date = moment(post.shift_date).format("dddd, MMMM Do, YYYY")
        return (
            <Mapp key={i}>
                <h2>{date}</h2>
                {item.incentive ? (
                    <span>Incentive: {item.incentive}</span>
                ) : null}
                <span>Clock In: {item.start_time}</span>
                <span>Posted {time}</span>
                <button onClick={() => getChat(item.user_id)} >Message</button>
            </Mapp>
        )
    })

    const acceptPost = async () => {
        let res = await axios
            .put(`/api/post/${id}`)
            .catch((err) => console.log("bobby", err))

        if (res.data.goodMessage) {
            swal("Request Sent!", "Please wait for poster's response!", "success")
        } else if (res.data.message) {
            swal("Request Failed!", "You've already asked for this shift.", "error")
        }
    }

    const getChat = async (acc_user_id) => {
        let res = await axios
            .get(`/api/getChat`, {acc_user_id})
            setMessages(res.data)
    }

    // const sendMessage = async () => {

    // }

    return (
        <>
            <Header />
            <Dash>
                <PostView>
                    <Posts>
                        {mappyboi}

                        <button onClick={() => acceptPost()}>
                            plz accept me
                        </button>
                    </Posts>
                    <ChatBox>
                        <Chat />
                    </ChatBox>
                </PostView>
            </Dash>
        </>
    )
}

export default Post

const Mapp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Posts = styled.div`
    height: 84vh;
    width: 26vw;
    background: pink;
    position: relative;
    top: 30px;
`
const ChatBox = styled.div`
    height: 84vh;
    width: 26vw;
    background: pink;
    position: relative;
    top: 30px;
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
    align-items: flex-start;
    width: 60%;
    height: 100%;
    background: #15202b;
    background-position: fixed;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`
