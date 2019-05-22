import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "./Header"
import axios from "axios"
import moment from "moment"
import swal from "@sweetalert/with-react"
import sockets from "./Sockets";

const Post = (props) => {
    const [post, setPost] = useState([])
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [user_id, setUser_id] = useState("")
    const [room, setRoom] = useState()
    const [acc_user_id, setAcc_user_id] = useState("")


    const id = props.match.params.post_id
    const getData = async () => {
        let res = await axios.get(`/api/post/${id}`)
        setPost(res.data)
    }

    useEffect(() => {
        getUserId()
        getData()
        getChat()
        //newnew
        sockets.on("returnJoin", mess => {
            setMessages(mess)
        })
        sockets.on("returnMessages", message => {
            setMessages(message)
        })
        //if uncommented out, don't forget to pass in messages in array below
    }, [acc_user_id])

    const getUserId = async () => {
        let res = await axios
            .get("/auth/user-data")
            setUser_id(res.data.user_id)
    }

    let mappyboi = post.map((item, i) => {
        if (!acc_user_id) {
            setAcc_user_id(item.user_id)
        }
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
                {/* <button onClick={() => getChat(item.user_id)} >Message</button> */}
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

    const getChat = async () => {
        let big
        let small
        if (user_id > acc_user_id) {
            big = user_id
            small = acc_user_id
        } else {
            big = acc_user_id
            small = user_id
        }
        let room = big + ":" + small
        sockets.emit("startChat", room)
        console.log(user_id)
        setRoom(room)
        console.log(user_id)
        let res = await axios
            .post(`/api/getChat`, { acc_user_id })
        setMessages(res.data)
    }


    //newnew
    const sendMessage = async (e) => {
        e.preventDefault()
        if (message !== "") {
            await sockets.emit("sendMessage", {
                messages: message,
                user_id: acc_user_id,
                room
            })

            setMessage("")
        }
        else {
            console.log('hi')
        }
        // getChat(acc_user_id)
    }


    const mapMessage = messages.map((mess) => {
        console.log(mess.user_id, user_id)
        return (
            <Map key={mess.chat_id}>
                <Span1 className={user_id === mess.user_id ? "gren" : "blue"}>{mess.messages}</Span1>
            </Map>
        )
    })

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
                        <MappM>
                            {mapMessage}
                        </MappM>
                        <Div3>
                            <Form onSubmit={sendMessage}>
                                <Input
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    value={message}
                                    placeholder="Enter Message"
                                />
                                <Button>Send</Button>
                            </Form>
                        </Div3>
                    </ChatBox>
                </PostView>
            </Dash>
        </>
    )
}

export default Post

const Button = styled.button`
    position: sticky;
    bottom: 0px;
    height: 30px;
`

const Input = styled.input`
    position: sticky;
    bottom: 0px;
    height: 30px;
    width: 80%;
    background: rgb(0,0,0,0.2);
`

const Form = styled.form`
    position: relative;
    bottom: 0%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
`

const Div3 = styled.div`
    position: fixed;
    bottom: 10px;
    width: 26vw;
    height: 40px;
`

const Span1 = styled.div`
    width: 75%;
    margin-bottom: 10px;
    border-radius: 15px;
    padding: 0px 0px 0px 20px;
`

const Map = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
`

const MappM = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    overflow-y: scroll;
    margin-bottom: 40px;
    &::-webkit-scrollbar {
        display: none;
    }
`

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
    height: 82vh;
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
    align-items: space-evenly;
    width: 60%;
    height: 100%;
    background: #15202b;
    background-position: fixed;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`
