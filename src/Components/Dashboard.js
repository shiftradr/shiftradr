import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import Header from "./Header"
import moment from "moment"
import axios from "axios"
import PostModal from "./PostModal"

const Dashboard = () => {
    const test = useRef()
    const typeRef = useRef()
    const [post, setPost] = useState([])
    const [start, setStart] = useState(moment().format("YYYY-MM-DD"))
    const [end, setEnd] = useState(
        moment()
            .add(1, "days")
            .format("YYYY-MM-DD"),
    )
    const [bob, setBob] = useState(false)

    useEffect(() => {
        getData()
        setBob(true)
    }, [])

    const getData = async () => {
        let res = await axios.get("/api/posts")
        setPost(res.data)
    }

    const filteredData = async () => {
        if (typeRef.current.value !== "0") {
            const bob = typeRef.current.value
            let res = await axios.post("/api/filtered", {
                shift_date1: start,
                shift_date2: end,
                post_type: bob,
            })
            setPost(res.data)
        } else {
            let res = await axios.post("/api/filtered", {
                shift_date1: start,
                shift_date2: end,
                post_type: null,
            })
            setPost(res.data)
        }
    }

    const takeShift = async (id) => {
        await axios
            .put(`/api/posts/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log("update error", err))
    }

    let map = post.map((item, i) => {
        let time = moment(item.post_date).fromNow()
        let date = moment(item.shift_date).format("dddd, MMMM Do, YYYY")
        let date2 = moment(item.shift_date)
        let date3 = moment(item.start_time, "HH:mm")
        if (moment().isSameOrAfter(date2) && moment().isAfter(date3)) {
            takeShift(item.post_id)
        }

        return (
            <PostV to={`/post/${item.post_id}`} key={i}>
                <span className="title">{date}</span>
                <span>Click to view more details</span>
                <div className="coolbeans">
                    {item.incentive ? (
                        <span>Incentive: {item.incentive}</span>
                    ) : null}
                    <span>
                        Clock In:{" "}
                        {item.start_time && item.start_time.slice(0, 5)}
                    </span>
                    <span>
                        Clock Out: {item.end_time && item.end_time.slice(0, 5)}
                    </span>
                    <div className='perm'>
                        {item.post_type === 1 ? (
                            <span>Trade</span>
                        ) : item.post_type === 2 ? (
                            <span>NSA</span>
                        ) : item.post_type === 3 ? (
                            <span>PERM</span>
                        ) : null}
                        <span className="posted">Posted {time}</span>
                    </div>
                </div>
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
                test={test}
                handleClick={handleClick}
                bob={bob}
            />
            <Dash>
                <PostView>
                    <SlideDown under={filter} ref={node}>
                        <FilterTitle>
                            <Div2>
                                <span style={{ marginBottom: "10px" }}>
                                    Please Select Date Range.
                                </span>
                                <Div>
                                    <InputDiv>
                                        From:
                                        <Input
                                            type="date"
                                            value={start}
                                            onChange={(e) =>
                                                setStart(e.target.value)
                                            }
                                        />
                                    </InputDiv>
                                    <InputDiv>
                                        Date:{"  "}
                                        <Input
                                            type="date"
                                            value={end}
                                            onChange={(e) =>
                                                setEnd(e.target.value)
                                            }
                                        />
                                    </InputDiv>
                                    <select ref={typeRef} className="select">
                                        <option value="0">
                                            Select Shift Type
                                        </option>
                                        <option value="1">Trade</option>
                                        <option value="2">NSA</option>
                                        <option value="3">PERM</option>
                                    </select>
                                </Div>
                            </Div2>
                            <Filter
                                onClick={() => {
                                    filteredData()
                                    setFilter(!filter)
                                }}
                            >
                                <i className="fas fa-filter" />
                                Filter
                            </Filter>
                        </FilterTitle>
                    </SlideDown>

                    {post[0] ? map : <h2>No Shifts Found</h2>}
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
    align-items: center;
    flex-direction: column;
`

const Div = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
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
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 5vh;
    height: 150px;
    width: 330px;
    padding: 10px;
    text-align: center;
    background: #4b5358;
    border-radius: 15px;
    margin: 20px;
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

const Dash = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8vh;
    height: 92vh;
    width: 100vw;
    background: #258ea6;
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

const SlideDown = styled.div`
    color: white;

    position: fixed;
    width: 60vw;
    height: 12vh;
    margin-top: 7.5vh;
    top: -13vh;
    z-index: 9;
    background: white;
    transition: 0.35s ease-in-out;
    background: #509aaa;
    background-image: linear-gradient(
        to bottom,
        #a6bcbe,
        #a6bcbe,
        #8bb1b6,
        #6fa5b0,
        #509aaa
    );
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

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
    align-items: flex-end;
    font-weight: bolder;
    height: 100%;
`

const Filter = styled.div`
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: 300;
    border: none;
    background: white;
    color: #8d8b8b;
    padding-top: 7px;

    /* position: relative;
  top: 10px; */
    margin: 0px 20px 20px 20px;
    display: flex;
    justify-content: space-evenly;
    width: 60px;

    &:hover {
        background: #8d8b8b;
        color: #fff;
        cursor: pointer;
    }
`
const InputDiv = styled.div`
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 200px;
    margin: 0px 7px 20px 7px;
`

const Input = styled.input`
    z-index: 10;
    font-size: 1rem;
    border: 1px solid #cfcfcf;
    border-radius: 15px;
    margin-bottom: 0px;
    width: 65%;
    color: #8d8b8b;
    padding: 5px;
`
