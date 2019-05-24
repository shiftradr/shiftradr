import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import Header from "./Header"
import axios from "axios"
import moment from "moment"
import swal from "@sweetalert/with-react"
import sockets from "./Sockets"

const Post = (props) => {
    const fakeRef = useRef(null)
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
        sockets.on("returnJoin", (mess) => {
            setMessages(mess)
        })
        sockets.on("returnMessages", (message) => {
            setMessages(message)
        })
        //if uncommented out, don't forget to pass in messages in array below
    }, [acc_user_id])

    const plzScroll = () => {
        fakeRef.current.scrollIntoView()
    }

    useEffect(plzScroll, [messages])
    const getUserId = async () => {
        let res = await axios.get("/auth/user-data")
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
                <h2 style={{ borderBottom: "1px solid white" }}>{date}</h2>
                <span style={{ marginBottom: "10px" }}>
                    {item.first_name} {item.last_name}
                </span>
                <span
                    style={{
                        padding: "0px 29px 20px 29px",
                        fontSize: "1.1rem",
                    }}
                >
                    Description: {item.memo}
                </span>
                {item.incentive ? (
                    <span>Incentive: {item.incentive}</span>
                ) : null}
                <span>
                    Clock In: {item.start_time && item.start_time.slice(0, 5)}
                </span>
                <span style={{ marginBottom: "30px" }}>
                    Clock Out: {item.end_time && item.end_time.slice(0, 5)}
                </span>
                <span style={{ fontSize: "0.7rem" }}>Posted {time}</span>
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
    }

    //newnew
    const sendMessage = async (e) => {
        e.preventDefault()
        if (message !== "") {
            await sockets.emit("sendMessage", {
                messages: message,
                user_id: acc_user_id,
                room,
            })

            setMessage("")
        } else {
            console.log("hi")
        }
        // getChat(acc_user_id)
    }

    const mapMessage = messages.map((mess) => {
        return (
            <Map
                key={mess.chat_id}
                className={user_id === mess.user_id ? "gren" : "blu"}
            >
                <Triangle
                    className={user_id === mess.user_id ? "green" : "blue"}
                />
                <Span1>{mess.messages}</Span1>
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
                        <Button2 onClick={() => acceptPost()}>
                            Accept Shift
                        </Button2>
                    </Posts>
                    <ChatBox>
                        <PlzScroll>
                            <MappM>{mapMessage}</MappM>
                            <DIv ref={fakeRef} />
                        </PlzScroll>
                        <Div3>
                            <Form onSubmit={sendMessage}>
                                <Input
                                    onChange={(e) => setMessage(e.target.value)}
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

const DIv = styled.div`
    height: 1px;
    width: 100%;
`

const PlzScroll = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
`

const Triangle = styled.div`
    height: 14px;
    width: 14px;
    clip-path: polygon(0% 100%, 100% 100%, 0% 0%);
`

const Button = styled.button`
    padding: 10px 18px 9px 16px;
    height: 46px;
    text-align: start;
    outline: none;
    border: none;
    background: #ff715b;
    color: white;
`

const Button2 = styled.button`
    padding: 9px 11px 9px 10px;
    text-align: start;
    border-radius: 15px;
    outline: none;
    border: none;
    background: #ff715b;
    color: white;
`

const Input = styled.input`
    height: 30px;
    width: 80%;
    background: #cfcfcf;
    outline: none;
    border: none;
    padding: 8px;
    margin: 0px;
    border-radius: 0px;
    flex-wrap: wrap;
`

const Form = styled.form`
    align-self: right;
    display: flex;
    flex-direction: row;
    width: 100%;
`

const Div3 = styled.div`
    position: sticky;
    bottom: 0px;
    width: 26vw;
    max-height: 40px;
`

const Span1 = styled.div`
    width: 100%;
    padding: 3px 5px 5px 20px;
    margin: 0px;
`

const Map = styled.div`
    word-wrap: break-word;

    max-width: 20vw;
    padding: 0px 10px;

    display: flex;

    margin: 10px 8px;
`

const MappM = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 80vh;
    overflow-y: scroll;
    margin-bottom: 30px;
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height: 84vh;
    width: 26vw;
    background: #2c4251;
    color: white;
    position: relative;
    border-radius: 15px;
    margin: 30px;
    box-shadow: 0px 1px 50px #cfcfcf;
`
const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 84vh;
    width: 26vw;
    background: #fff;
    position: relative;
    overflow-y: scroll;
    border-radius: 15px;
    box-shadow: 0px 1px 50px #cfcfcf;

    margin: 30px;
    &::-webkit-scrollbar {
        display: none;
    }
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
    background: #232b2c;
`
const PostView = styled.div`
    background: #3a474e;
    display: flex;
    justify-content: center;
    align-items: space-evenly;
    width: 100%;
    height: 100%;
    background-position: fixed;
    overflow-y: scroll;
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
