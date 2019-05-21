import React, { useEffect, useState } from "react"
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
        sockets.on("returnJoin", mess => {
            setMessages(mess)
})
        sockets.on("returnMessages", message => {
            setMessages(message)
        })
    }, [messages])
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
        // await sockets.emit("endChat", room);
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
        // getChat(user_id2)
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
                    ) : (
                        <span>Shift no longer listed</span>
                    )}
                    <button onClick={() => getChat(peeps.acc_user_id)}>
                        Message
                    </button>
                </Mapp>
            </Mapp>
        )
    })

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
                        <Posts>{mapped}</Posts>
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

export default AcceptPost

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

const Span1 =styled.div`
    width: 75%;
    margin-bottom: 10px;
    border-radius: 15px;
    padding: 0px 0px 0px 20px;
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
    /* height: 100%; */
`
const Button = styled.button`
    position: sticky;
    bottom: -110px;
    height: 30px;
`

const Map = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
`

const Div3 = styled.div`
    position: fixed;
    bottom: 10px;
    width: 26vw;
    height: 40px;
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
    background: rebeccapurple;
    position: relative;
    top: 10px;
    display: flex;
    flex-direction: column;
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
