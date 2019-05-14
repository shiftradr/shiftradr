import React, { useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import Header from "./Header"
import swal from "@sweetalert/with-react"
import Post from "./Post"
import axios from "axios"

const Dashboard = (props) => {
    const test = useRef()

    const [post, setPost] = useState([])

    useEffect(() => {
        const getData = async () => {
            axios.get("/auth/user-data").then((res) => console.log(res.data))
            let res = await axios.get("/api/posts")
            console.log(9999, res.data[0])
            setPost(res.data)
            console.log(res)
        }
        getData()
    }, [])

    console.log(1111, post)

    let map = post.map((item, i) => {
        return (
            <PostV key={i}>
                <span>Date:  {item.shift_date}</span>
                <span>{item.memo}</span>
                <span>Incentive:  {item.incentive}</span>
                <Button>Message Poster</Button>
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
            <Header test={test} handleClick={handleClick} />
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

const Button = styled.button`
    background: #519e8a;
    color: white;
    padding: 8px;
    border-radius: 20px;
    outline: none;
    border: none;

`

const PostV = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 5vh;
    height: 100px;
    width: 90%;
    background: pink;
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
