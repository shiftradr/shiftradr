import React, { useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import Header from "./Header"
import swal from "@sweetalert/with-react"
import moment from 'moment'
// import Post from "./Post"
import axios from "axios"

const Dashboard = (props) => {
    const test = useRef()

    const [post, setPost] = useState([])

    useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
        axios.get("/auth/user-data").then((res) => console.log(res.data))
        let res = await axios.get("/api/posts")
        console.log(9999, res.data[0])
        setPost(res.data)
        console.log(res)
    }
    console.log(1111, post)

    let map = post.map((item, i) => {
        let time = moment(item.post_date).fromNow()
        let date = moment(item.shift_date).format('dddd, MMMM Do, YYYY')
        let when = moment(item.shift_date)
        let bob = moment().to(when)
        return (
            <PostV key={i}>
                <span>{date}</span>
                <span>{item.memo}</span>
                <span>Incentive:  {item.incentive}</span>
                <span>Posted {time}</span>
                <span>{bob}</span>
            </PostV>
        )
    })

    const node = useRef()

    const [filter, setFilter] = useState(false)

    const handleClickOutside = (e) => {
        console.log("clicking anywhere")
        if (node.current.contains(e.target) || test.current.contains(e.target)) {
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

    return (
        <>
            <Header getData={getData} test={test} handleClick={handleClick} />
            <Dash>
                <PostView>
                    <SlideDown under={filter} ref={node}>
                        <FilterTitle>
                            <InputDiv>
                                Date:
                                <Input type="date" />
                            </InputDiv>
                            <InputDiv>
                                Date:
                                <Input type="date" />
                            </InputDiv>
                            <InputDiv>
                                Give
                                <Input type="checkbox" {...props} />
                            </InputDiv>
                            <InputDiv>
                                Trade
                                <Input type="checkbox" {...props} />
                            </InputDiv>
                            <InputDiv>
                                Incentives
                                <Input type="checkbox" {...props} />
                            </InputDiv>
                            <Filter
                                // className="fas fa-filter"
                                onClick={() => setFilter(!filter)}
                            />
                        </FilterTitle>
                    </SlideDown>
                    {map}
                    <button onClick={() => swal(post[0].memo)}>hi</button>
                </PostView>
            </Dash>
        </>
    )
}

export default Dashboard

// const Button = styled.button`
//     background: #519e8a;
//     color: white;
//     padding: 8px;
//     border-radius: 20px;
//     outline: none;
//     border: none;
//     margin: 8px 0px;
// `

const PostV = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 5vh;
    min-height: 120px;
    width: 90%;
    background: #283E4A;
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
    justify-content: center;
    align-items: center;
    height: 100%;
`

const Input = styled.input`
    z-index: 10;
    font-size: 1.1rem;
    border: none;
    border-bottom: 1px solid black;

`
