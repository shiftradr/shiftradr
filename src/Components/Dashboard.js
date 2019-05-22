import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import Header from "./Header"
import moment from "moment"
import axios from "axios"
import PostModal from "./PostModal"

const Dashboard = (props) => {
    const test = useRef()
    const typeRef = useRef()

    const [post, setPost] = useState([])
    const [start, setStart] = useState(moment().format('YYYY-MM-DD'))
    const [end, setEnd] = useState(moment().add(1, 'days').format('YYYY-MM-DD'))

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        axios.get("/auth/user-data").then((res) => console.log(res.data))
        let res = await axios.get("/api/posts")
        setPost(res.data)
    }

    const filteredData = async () => {
        if(typeRef.current.value !== '0'){
            const bob = typeRef.current.value
            let res = await axios.post('/api/filtered', { shift_date1: start, shift_date2: end, post_type: bob })
            setPost(res.data)
            console.log(bob)
        } else {
            let res = await axios.post('/api/filtered', { shift_date1: start, shift_date2: end, post_type: null })
            setPost(res.data)

        }
    }

    const takeShift = async (id) => {
        await axios
            .put(`/api/posts/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log("update error", err))
        getData()
    }

    let map = post.map((item, i) => {
        let time = moment(item.post_date).fromNow()
        let date = moment(item.shift_date).format("dddd, MMMM Do, YYYY")
        let date2 = moment(item.shift_date)
        let date3 = moment(item.start_time, "HH:mm")
        if (moment().isSameOrAfter(date2) && moment().isAfter(date3)) {
            takeShift(item.post_id)
        }

        return  (
            <PostV to={`/post/${item.post_id}`} key={i}>
                <span>{date}</span>
                <span>{item.memo}</span>
                {item.incentive ? (
                    <span>Incentive: {item.incentive}</span>
                ) : null}
                <span>Posted {time}</span>
                <span>Clock In: {item.start_time.slice(0, 5)}</span>
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

    console.log(end)
    console.log(start)

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
                                        From:
                                        <Input type="date" value={start} onChange={(e) => setStart(e.target.value)}/>
                                    </InputDiv>
                                    <InputDiv>
                                        Date:
                                        <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)}/>
                                    </InputDiv>
                                    <InputDiv>
                                        <select ref={typeRef} name="" >
                                            <option value='0' >Select Shift Type</option>
                                            <option value="1">Trade</option>
                                            <option value="2">NSA</option>
                                            <option value="3">PERM</option>
                                        </select>
                                    </InputDiv>
                                </Div>
                            </Div2>
                            <Filter
                                className="fas fa-filter"
                                onClick={() => {
                                    filteredData()
                                    setFilter(!filter)
                                    }}
                            />
                        </FilterTitle>
                    </SlideDown>
                    
                    {post[0] ? (map) : (<h2>No Shifts Found</h2>)}
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
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

const Filter = styled.div`
position: relative;
top: 20px;

`
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
