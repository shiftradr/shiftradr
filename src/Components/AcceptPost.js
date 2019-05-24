import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Header from "./Header"
import axios from "axios"
import moment from "moment"
import swal from "@sweetalert/with-react"
import sockets from "./Sockets"

const AcceptPost = (props) => {
    const [post, setPost] = useState([{ taken: false }])
    const [peeps, setPeeps] = useState([])
    const [currentUser, setUser] = useState("")
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [taken, setTaken] = useState("")
    const [user_id, setUser_id] = useState("")
    const [user_id2, setUser_id2] = useState("")
    const [room, setRoom] = useState()
    const fakeRef = useRef(null)

    const id = props.match.params.post_id
    const getData = async () => {
        let res = await axios.get(`/api/post/${id}`)
        setPost(res.data)
        setUser_id(res.data[0].user_id)
    }

    useEffect(() => {
        axios.get("/auth/user-data").then((res) => setUser(res.data))
        getData()
        getPeeps()
        sockets.on("returnJoin", (mess) => {
            setMessages(mess)
        })
        sockets.on("returnMessages", (message) => {
            setMessages(message)
        })
    }, [taken])

    let mappyboi = post.map((item, i) => {
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

    const getPeeps = async () => {
        let res = await axios.get(`/api/interested/${id}`)
        setPeeps(res.data)
    }

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
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        if (message !== "") {
            await sockets.emit("sendMessage", {
                messages: message,
                user_id: user_id2,
                room,
            })

            setMessage("")
        }
    }

    const plzScroll = () => {
        fakeRef.current.scrollIntoView()
    }

    useEffect(plzScroll, [messages])

    let mapped = peeps.map((peeps, i) => {
        return (
            <Mapp key={i}>
                <Mappy>
                    <span style={{ flexDirection: "row", marginTop: "10px" }}>
                        <span style={{ fontSize: "1.5rem" }}>
                            {peeps.acc_first_name} {peeps.acc_last_name}{" "}
                        </span>{" "}
                        Employee ID: {peeps.acc_emp_id}
                    </span>
                    <Mapp>
                        {!post[0].taken ? (
                            <>
                                <Button1
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
                                </Button1>
                                <Button1>Decline</Button1>
                            </>
                        ) : (
                            <span>Shift no longer listed</span>
                        )}
                        <Button1 onClick={() => getChat(peeps.acc_user_id)}>
                            Message
                        </Button1>
                    </Mapp>
                </Mappy>
            </Mapp>
        )
    })
    console.log(mapped)
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
                    <PostH>{mappyboi}</PostH>
                    <Divv>
                        <Posts>
                            {mapped.length === 0 ? <h2 style={{margin: '160px 15px', fontWeight: '300', fontSize: '2rem'}}>No one has offered to take your shift, please check back later.</h2> : <div>{ mapped }</div>}
                        </Posts>
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

export default AcceptPost

const PlzScroll = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
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

const Span1 = styled.div`
    width: 100%;
    margin: 2px;
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
const Button = styled.button`
    padding: 10px 18px 9px 16px;
    height: 46px;
    text-align: start;
    border: none;
    outline: none;
    background: #ff715b;
`
const Button1 = styled.button`
    padding: 3px 8px;
    text-align: start;
    border: 2px solid #ff715b;
    outline: none;
    background: #fff;
    border-radius: 15px;
    margin: 15px 0px;
    color: #ff715b;

    &:hover {
        background: #ff715b;
        color: #fff;
    }
`

const Map = styled.div`
    word-wrap: break-word;

    max-width: 20vw;
    padding: 0px 8px;

    display: flex;

    margin: 10px 8px;
`

const Div3 = styled.div`
    position: sticky;
    bottom: 0px;
    width: 26vw;
    height: 40px;
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
    border-radius: 10px;
    color: #fff;
`
const Triangle = styled.div`
    height: 14px;
    width: 14px;
    clip-path: polygon(0% 100%, 100% 100%, 0% 0%);
`

const Mappy = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid white;
`

const Posts = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 76vh;
    width: 26vw;
    background: #2c4251;
    color: white;
    position: relative;
    top: -5px;
    border-radius: 10px;
    box-shadow: 0px 1px 50px #cfcfcf;
    margin-right: 12px;
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
    justify-content: center;
    align-items: space-evenly;
    width: 100%;
`
const DIv = styled.div`
    height: 1px;
    width: 100%;
`
