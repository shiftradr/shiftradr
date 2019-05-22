import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import Header from "./Header"
import swal from "@sweetalert/with-react"
import moment from "moment"
import axios from "axios"
import PostModal from "./PostModal"

const Dashboard = (props) => {
    const test = useRef()

    const [post, setPost] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        axios.get("/auth/user-data").then((res) => console.log(res.data))
        let res = await axios.get("/api/posts")
        // console.log(9999, res.data[0])
        setPost(res.data)
        // console.log(res)
    }
    // console.log(1111, post)

    const takeShift = async (id) => {
        await axios
            .put(`/api/posts/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log("update error", err))
        getData()
    }

    console.log(post)

    let map = post.map((item, i) => {
        let time = moment(item.post_date).fromNow()
        let date = moment(item.shift_date).format("dddd, MMMM Do, YYYY")
        let date2 = moment(item.shift_date)
        let date3 = moment(item.start_time, "HH:mm:ss")
        if (moment().isSameOrAfter(date2) && moment().isAfter(date3)) {
            takeShift(item.post_id)
        }

        return (
            <PostV to={`/post/${item.post_id}`} key={i}>
                <PDiv1>
                    <H2>{date}</H2>
                    <span>Start Time: {item.start_time}</span>
                    <span>End Time: {item.end_time}</span>

                </PDiv1>
                <PDiv2>
                    <span>{item.memo}</span>

                </PDiv2>
                <PDiv3>
                    {item.incentive ? (
                        <SpanTop>Incentive: {item.incentive}</SpanTop>
                    ) : null}
                    <SpanBottom>Posted {time}</SpanBottom>

                </PDiv3>
            </PostV>
        )
    })

    const node = useRef()

    const [filter, setFilter] = useState(false)

    const handleClickOutside = (e) => {
        if (
            node.current.contains(e.target) ||
            test.current.contains(e.target)
        ) {
            // inside click
            return
        }
        // outside click
        setFilter(false)
    }

    const handleClick = () => {
        setFilter(!filter)
    }

    useEffect(() => {
        if (filter) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [filter])

    const handleModal = () => {
        setModal(!modal)
    }

    const [modal, setModal] = useState(false)

    return (
        <>
            <Header
                handleModal={handleModal}
                getData={getData}
                test={test}
                handleClick={handleClick}
            />
            <Dash>
                <PostView>
                    <SlideDown under={filter} ref={node}>
                        <FilterTitle>
                            <Div2>
                                <span>Please Select Date Range:</span>
                                <Div>
                                    <InputDiv>
                                        From:{'   '}
                                        <Input type="date" />
                                    </InputDiv>
                                    <InputDiv>
                                        Date:
                                    <Input type="date" />
                                    </InputDiv>
                                </Div>
                            </Div2>
                            <Filter
                                // className="fas fa-filter"
                                onClick={() => setFilter(!filter)}
                            />
                        </FilterTitle>
                    </SlideDown>

                    {map}
                    <button onClick={() => swal(post[0].memo)}>hi</button>
                    {modal && (
                        <PostModal
                            getData={getData}
                            handleModal={handleModal}
                            modal={modal}
                        />
                    )}
                </PostView>
            </Dash>
        </>
    )
}

export default Dashboard


const Div2 = styled.div`
     display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    
`

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 430px;
`

// const Button = styled.button`
//     background: #519e8a;
//     color: white;
//     padding: 8px;
//     border-radius: 20px;
//     outline: none;
//     border: none;
//     margin: 8px 0px;
// `

const PostV = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 5vh;
    min-height: 120px;
    width: 90%;
    background: #283e4a;
    border-radius: 20px;
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
    justify-content: flex-start;
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

const SlideDown = styled.div`
    position: fixed;
    width: 60vw;
    height: 8vh;
    margin-top: 8vh;
    top: -8vh;
    z-index: 9;
    background: white;
    transition: 0.35s ease-in-out;
    ${(props) =>
        props.under &&
        css`
            top: 0px;
        `}
`

// const I = styled.i`
//     margin: 0px 20px;
//     font-size: 1.7rem;
//     position: relative;
//     right: 20vw;
// `

const FilterTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    font-weight: bolder;
    height: 100%;
`

const Filter = styled.div``
const InputDiv = styled.div`
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 200px;

`

const Input = styled.input`
    z-index: 10;
    font-size: 1.1rem;
    border: none;
    border-bottom: 1px solid black;
`

const PDiv1 = styled.div`
display: flex;
flex-direction: column;
margin-left: 1em;
width: 45%;
`

const PDiv2 = styled.div`
margin-left: .5em;
margin-right: .5em;
width: 27.5%;
`

const PDiv3 = styled.div`
display: flex;
flex-direction: column;
margin-right: 1em;
justify-content: space-between;
width: 27.5%;

`

const H2 = styled.h2`
margin-bottom: .5em;
margin-top: -.1em;
`

const SpanTop = styled.span`
display: flex;
justify-content: flex-start;
`

const SpanBottom = styled.span`
display: flex;
justify-content: flex-end;

`
