import React, { useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import swal from "@sweetalert/with-react"
import axios from 'axios'

const Header = (props) => {
    const node = useRef()
    const bars = useRef()

    const [open, setOpen] = useState(false)

    // const [filter, setFilter] = useState(false)

    //createNewPost Refs
    const shiftDateRef = useRef()
    const startTimeRef = useRef()
    const endTimeRef = useRef()
    const memoRef   = useRef()
    const incentiveRef  = useRef()

    const handleClickOutside = (e) => {
        console.log("clicking anywhere")
        if (node.current.contains(e.target) || bars.current.contains(e.target)) {
            // inside click
            return
        }
        // outside click
        setOpen(false)
    }

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [open])

    const createNewPost = async () => {
        await axios.post('/api/posts', {
            shiftDate: shiftDateRef.current.value,
            startTime: startTimeRef.current.value,
            endTime: endTimeRef.current.value,
            memo: memoRef.current.value,
            incentive: incentiveRef.current.value
        }).then(res => res.data)
    }

    return (
        <div>
            <Head>
                <Icons>
                <StyledLink
                    onClick={() =>
                        swal(
                            <Div>
                                <h1>Please enter shift date</h1>
                                <InputDiv>
                                    Date:<Input type="date" ref={shiftDateRef} />
                                </InputDiv>
                                <InputDiv>
                                    Clock In:<Input type="time" ref={startTimeRef} />
                                </InputDiv>
                                <InputDiv>
                                    Clock Out:<Input type="time" ref={endTimeRef} />
                                </InputDiv>
                                <InputDiv>
                                    Description: <Input
                                        type="text"
                                        placeholder="Add Description"
                                        ref={memoRef}
                                    />
                                </InputDiv>
                                <InputDiv>
                                    Incentive: <Input type="text" placeholder="Enter Incentive" ref={incentiveRef} />
                                </InputDiv>
                            </Div>,
                            {
                                buttons: {
                                    cancel: "Cancel",
                                    Post: true,
                                },
                            },
                        
                        ).then(function(){
                            createNewPost()
                            swal('coooooollllllll')
                        }, function(dismiss){
                            if (dismiss === 'cancel'){
                                swal('canceled')
                            }
                        })
                    }
                >
                    <i className="fas fa-plus" />
                    Post
                </StyledLink>
                <StyledLink 
                    ref={props.test}
                    onClick={props.handleClick}>
                        <i className="fas fa-filter" />
                        Filter
                    </StyledLink>
                    <StyledLink>
                    <i className="fas fa-bookmark"></i>
                        Faves
                    </StyledLink>
                </Icons>
                <Linked to="/dashboard">
                    <h1>ShifTradr</h1>
                </Linked>
                <I ref={bars} className="fas fa-bars" onClick={() => setOpen(!open)} />
            </Head>
            <SlideOut on={open} ref={node}>
                <SettingsTitle>
                    <span>Settings</span>
                    <Times
                        className="fas fa-times"
                        onClick={() => setOpen(!open)}
                    />
                </SettingsTitle>
                <h4>Account</h4>
                <Link to='/my-posts' ><h4>My Posts</h4></Link>
            </SlideOut>
        </div>
    )
}

export default Header

const Icons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

const Input = styled.input`
    width: 170px;
    height: 30px;
    border: none;
    border-bottom: 1px solid black;
    margin: 10px 0px;
    background: white;
    outline: none;
    text-align: center;

    &:focus {
        outline: none;
    }
`

const Times = styled.i`
    position: relative;
    left: 75px;
    font-size: 1.5rem;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: #1c354b;
    }
`

const SettingsTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-bottom: 1px solid white;
    height: 8vh;
    font-size: 1.7rem;
`

const SlideOut = styled.div`
    position: fixed;
    width: 300px;
    height: 100vh;
    right: -300px;
    top: 0vh;
    z-index: 10;
    background: #152023;
    transition: 0.35s ease-in-out;
    ${(props) =>
        props.on &&
        css`
            right: 0px;
        `}
`

const Head = styled.div`
    position: fixed;
    top: 0px;
    height: 8vh;
    z-index: 10;

    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: white;
    background: #1c2938;
`
const I = styled.i`
    margin: 0px 20px;
    font-size: 1.7rem;
    position: relative;
    right: 20vw;
`
const StyledLink = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 30px;
    width: 80px;
    border-radius: 30px;
    background: #10171e;
    color: white;
    font-size: 1rem;
    position: relative;
    left: 12vw;
`
const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const InputDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 280px;
`

const Linked = styled(Link)`
    position: relative;
    right: 5.5vw;
`
