import React, { useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import { Link } from 'react-router-dom'
import Header from "./Header"
import swal from "@sweetalert/with-react"
import axios from 'axios'

const Dashboard = (props) => {

const [post, setPost] = useState([])

useEffect( () => {
    const getData = async () => {
        axios.get('/auth/user-data').then(res => console.log(res.data))
        let res = await axios.get('/api/posts')
        // console.log(9999, res.data[0])
        setPost(res.data)
        // console.log(res)
    }
    getData()
}, [])

// console.log(1111, post)

let map = post.map((item, i) => {
    return (
        <div key={i}>
            <h1>{item.memo}</h1>
        </div>
    )
})

    const node = useRef()

    const [filter, setFilter] = useState(false)

    const handleClickOutside = (e) => {
        console.log("clicking anywhere")
        if (node.current.contains(e.target)) {
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
            <Header handleClick={handleClick} />
            <Dash>
                <PostView>
                    <button onClick={() => swal(post[0].memo)}>hi</button>
                    {/* <I className="fas fa-filter" onClick={() => setFilter(!filter)} /> */}
                    <SlideDown under={filter} ref={node}>
                        <FilterTitle>
                            <InputDiv>
                                Date:<Input type="date" />
                            </InputDiv>
                            <InputDiv>
                                Date:<Input type="date" />
                            </InputDiv>
                            <InputDiv>
                                Clock In:<Input type="time" />
                            </InputDiv>
                            <InputDiv>
                                Clock Out:<Input type="time" />
                            </InputDiv>
                            <InputDiv>
                                Give<Input type="checkbox" {...props} />
                            </InputDiv>
                            <InputDiv>
                                Trade<Input type="checkbox" {...props} />
                            </InputDiv>
                            <InputDiv>
                                Incentive<Input type="checkbox" {...props} />
                            </InputDiv>
                            <Filter
                                // className="fas fa-filter"
                                onClick={() => setFilter(!filter)}
                                
                                />
                        </FilterTitle>
                    </SlideDown>
                    {map}
                    <button onClick={() => swal("hi")}>hi</button>
                </PostView>
            </Dash>
        </>
    )
}

export default Dashboard

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

const I = styled.i`
    margin: 0px 20px;
    font-size: 1.7rem;
    position: relative;
    right: 20vw;
`

const FilterTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: bolder;
`

const Filter = styled.div`

`
const InputDiv = styled.div`
    z-index: 10
`

const Input = styled.input`
    z-index: 10;
    font-size: 1.1rem;

`
