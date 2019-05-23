import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "./Header"
import axios from "axios"
import moment from "moment"
import sockets from "./Sockets";

const AppliedPost = (props) => {
    const [post, setPost] = useState([])
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [user_id, setUser_id] = useState("")
    const [user_id2, setUser_id2] = useState("")
    const [room, setRoom] = useState()
    const [acc_user_id, setAcc_user_id] = useState("")

    const id = props.match.params.post_id
    const getData = async () => {
        let res = await axios.get(`/api/applied-post/${id}`)
        setPost(res.data)
    }

    useEffect(() => {
        getUserById()
        getChat()
        getData()
        sockets.on("returnJoin", mess => {
            setMessages(mess)
        })
        sockets.on("returnMessages", message => {
            setMessages(message)
        })

    }, [acc_user_id])

    const getUserById = async () => {
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
            </Mapp>
        )
    })

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
        setRoom(room)
        let res = await axios.post(`/api/getChat`, { acc_user_id })
        setMessages(res.data)
        setUser_id2(acc_user_id)
        // console.log(res.data)
        // console.log(acc_user_id)
    }


    const sendMessage = async (e) => {
        e.preventDefault()
        if (message !== "") {
            await sockets.emit("sendMessage", {
                messages: message,
                user_id: user_id2,
                room
            })
        }
    }

    const mapMessage = messages.map((mess) => {
        return (
            <Map key={mess.chat_id}>
                <Span1 className={user_id === mess.user_id ? "gren" : "blu"}>{mess.messages}</Span1>
            </Map>
        )
    })

    return (
        <>
            <Header />
            <Dash>
                <PostView>
                    <PostH>{mappyboi}</PostH>
                    <Divv>
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
                    </Divv>
                </PostView>
            </Dash>
        </>
    )
}

export default AppliedPost

const Button = styled.button`
    position: sticky;
    bottom: -110px;
    height: 30px;
`

const Input = styled.input`
    position: sticky;
    // bottom: 0px;
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

const ChatBox = styled.div`
    height: 76vh;
    width: 26vw;
    background: lightseagreen;
    position: relative;
    top: 10px;
`

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
