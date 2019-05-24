import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import Header from "./Header"
import axios from "axios"
import moment from "moment"
import sockets from "./Sockets"

const AppliedPost = (props) => {
    const [post, setPost] = useState([])
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [user_id, setUser_id] = useState("")
    const [user_id2, setUser_id2] = useState("")
    const [room, setRoom] = useState()
    const [acc_user_id, setAcc_user_id] = useState("")
    const fakeRef = useRef(null)

    const id = props.match.params.post_id
    const getData = async () => {
        let res = await axios.get(`/api/applied-post/${id}`)
        setPost(res.data)
    }

    useEffect(() => {
        getUserById()
        getChat()
        getData()
        sockets.on("returnJoin", (mess) => {
            setMessages(mess)
        })
        sockets.on("returnMessages", (message) => {
            setMessages(message)
        })
    }, [acc_user_id])

    const getUserById = async () => {
        let res = await axios.get("/auth/user-data")
        setUser_id(res.data.user_id)
    }

    let mappyboi = post.map((item, i) => {
        if (!acc_user_id) {
            setAcc_user_id(item.user_id)
        }

        const date = moment(post.shift_date).format("dddd, MMMM Do, YYYY")
        return (
            <Mapp key={i}>
                <div>
                    <div
                        style={{
                            fontSize: "1.4rem",
                            width: "320px",
                            textAlign: "center",
                        }}
                    >
                        {date}
                    </div>
                    <div
                        style={{
                            width: "320px",
                            display: "flex",
                            justifyContent: "space-evenly",
                            fontSize: ".8rem",
                        }}
                    >
                        <span>
                            Clock In:{" "}
                            {item.start_time && item.start_time.slice(0, 5)}
                        </span>
                        <span>
                            Clock Out:{" "}
                            {item.end_time && item.end_time.slice(0, 5)}
                        </span>
                    </div>
                </div>
                <span style={{ padding: "0px 10px" }}>{item.memo}</span>
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
                room,
            })
        }
        setMessage("")
    }

    const plzScroll = () => {
        fakeRef.current.scrollIntoView()
    }


    useEffect(plzScroll, [messages])

    const mapMessage = messages.map((mess) => {
        return (
            <Map
                key={mess.chat_id}
                className={!user_id === mess.user_id ? "gren" : "blu"}
            >
                <Triangle
                    className={!user_id === mess.user_id ? "green" : "blue"}
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
                    <PostH>{mappyboi}</PostH>
                    <Divv>
                        <ChatBox>
                            <PlzScroll>
                                <MappM>{mapMessage}</MappM>
                                <DIv ref={fakeRef} />
                            </PlzScroll>

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
    border: none;
    outline: none;
    background: #ff715b;
`

const Input = styled.input`
    height: 30px;
    width: 80%;
    background: #cfcfcf;
    outline: none;
    border: none;
    padding: 8px;
    margin: 0px;
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
    position: sticky;
    bottom: 0px;
    width: 26vw;
    height: 40px;
`

const Span1 = styled.div`
    width: 100%;
    margin: 2px;
`

const Map = styled.div`
    word-wrap: break-word;

    max-width: 20vw;
    padding: 0px 8px;

    display: flex;

    margin: 10px 8px;
`

const MappM = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 70vh;
    overflow-y: scroll;
    margin-bottom: 15px;
    &::-webkit-scrollbar {
        display: none;
    }
`

const PostH = styled.div`
    width: 54%;
    height: 8vh;
    display: flex;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    /* background: #2c4251; */
    position: relative;
    top: 5px;
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

const Mapp = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    color: #fff;
    border-radius: 10px;
`

const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 76vh;
    width: 26vw;
    background: #fff;
    position: relative;
    top: -5px;
    border-radius: 10px;
    overflow-y: scroll;
    margin-left: 12px;
    box-shadow: 0px 1px 50px #cfcfcf;

    &::-webkit-scrollbar {
        display: none;
    }
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
const Divv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: space-evenly;
    width: 100%;
`
const DIv = styled.div`
    height: 1px;
    width: 100%;
`
