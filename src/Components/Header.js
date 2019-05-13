import React, { useState } from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import Search from './Search'

const Header = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <div>
            <Head>
                <StyledLink to="/post">
                    <i className="fas fa-plus" />
                    Post
                </StyledLink>
                <Search />
                <Link to="/dashboard">
                    <h1>ShifTradr</h1>
                </Link>
                <I className="fas fa-bars" onClick={() => setToggle(!toggle)} />
            </Head>
            <SlideOut on={toggle}>
                <SettingsTitle>
                    <span>Settings</span>
                    <Times className="fas fa-times" />
                </SettingsTitle>
            </SlideOut>
        </div>
    )
}

export default Header

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
const StyledLink = styled(Link)`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 30px;
    width: 80px;
    border-radius: 30px;
    background: #10171e;
    outline: none;
    color: white;
    text-decoration: none;
    border-bottom: none;
    font-size: 1rem;
    position: relative;
    left: 20vw;
`
