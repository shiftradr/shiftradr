import React, { useState, useEffect } from "react"
import Header from "./Header"
import styled from "styled-components"
import axios from "axios"
import moment from "moment"
import { Link } from "react-router-dom"

const AppliedHistory = (props) => {
    const [post, setPost] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let res = await axios.get("/api/applied-for")
        setPost(res.data)
    }

    let map = post.map((item, i) => {
        let time = moment(item.post_date).fromNow()
        let date = moment(item.shift_date).format("dddd, MMMM Do, YYYY")
        return (
            <PostV to={`/applied-for-post/${item.post_id}`} key={i}>
                <DivForSftuff>
                    <span
                        style={{
                            borderBottom: "1px solid #fff",
                            fontSize: "1.5rem",
                            marginBottom: "10px",
                        }}
                    >
                        {date}
                    </span>
                    <span>
                        {item.first_name} {item.last_name} Employee ID:{" "}
                        {item.post_emp_id}
                    </span>
                    <span>{item.memo}</span>
                    <Div2>
                        {item.incentive ? (
                            <span>Incentive: {item.incentive}</span>
                        ) : null}
                        <span>
                            Clock In:{" "}
                            {item.start_time && item.start_time.slice(0, 5)}
                        </span>
                        <span>
                            Clock Out:{" "}
                            {item.end_time && item.end_time.slice(0, 5)}
                        </span>
                    </Div2>
                <div className="perm">
                    {item.post_type === 1 ? (
                        <span>Trade</span>
                    ) : item.post_type === 2 ? (
                        <span>NSA</span>
                    ) : item.post_type === 3 ? (
                        <span>PERM</span>
                    ) : null}
                    <span className="posted">Posted {time}</span>
                </div>
                </DivForSftuff>
            </PostV>
        )
    })

    return (
        <>
            <Header />
            <Dash>
                <PostView>
                    <Title>Shift History</Title>
                    {map}
                </PostView>
            </Dash>
        </>
    )
}
export default AppliedHistory

const DivForSftuff = styled.div`
    display: flex;
    flex-direction: column;
    height: 200px;
    width: 90%;
`

const Div2 = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-start;
`

const Span = styled.span`
    position: relative;
    bottom: -5px;
    right: -190px;
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

const PostV = styled(Link)`
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 5vh;
    height: 200px;
    width: 530px;
    padding: 10px;
    text-align: center;
    background: #4b5358;
    border-radius: 15px;
    margin: 20px;
    color: #fff;
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

// const Button = styled.button`
//     background: #8b0000;
//     color: white;
//     padding: 8px;
//     border-radius: 20px;
//     outline: none;
//     border: none;
// `
const Title = styled.h1`
    color: white;
    font-weight: 300;
    position: absolute;
    top: -13px;
    left: 250px;
    z-index: 100;
`
