import React, { useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import swal from "@sweetalert/with-react"

const Header = () => {
    const [toggle, setToggle] = useState(false)

    const node = useRef()

    const [open, setOpen] = useState(false)

    const handleClickOutside = (e) => {
        console.log("clicking anywhere")
        if (node.current.contains(e.target)) {
            // inside click
            return
        }
        // outside click
        setOpen(false)
    }

    const handleChange = (selectedValue) => {
        // onChange(selectedValue);
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

    return (
        <div>
            <Head>
                <StyledLink
                    onClick={() =>
                        swal(
                            <Div>
                                <h1>Please enter shift date</h1>
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
                                   Description: <Input
                                        type="text"
                                        placeholder="Add Description"
                                    />
                                </InputDiv>
                                <InputDiv>
                                    Incentive: <Input type="text" placeholder="Enter Incentive" />
                                </InputDiv>
                            </Div>,
                            {
                                buttons: {
                                    cancel: "Cancel",
                                    Post: true,
                                },
                            },
                        )
                    }
                >
                    <i className="fas fa-plus" />
                    Post
                </StyledLink>
                <Search />
                <Link to="/dashboard">
                    <h1>ShifTradr</h1>
                </Link>
                <I className="fas fa-bars" onClick={() => setOpen(!open)}  />
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
                <h4 />
            </SlideOut>
        </div>
    )
}

export default Header

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
    left: 20vw;
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
