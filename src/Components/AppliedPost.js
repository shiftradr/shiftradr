import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "./Header"
import axios from "axios"
import moment from "moment"

const AppliedPost = (props) => {
    const [post, setPost] = useState([])

    const id = props.match.params.post_id
    const getData = async () => {
        let res = await axios.get(`/api/applied-post/${id}`)
        setPost(res.data)
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
                        <ChatBox />
                    </Divv>
                </PostView>
            </Dash>
        </>
    )
}

export default AppliedPost

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
