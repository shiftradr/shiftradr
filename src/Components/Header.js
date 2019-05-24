import React, { useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

const Header = (props) => {
    const node = useRef()
    const bars = useRef()

    const [open, setOpen] = useState(false)

    const handleClickOutside = (e) => {
        if (
            node.current.contains(e.target) ||
            bars.current.contains(e.target)
        ) {
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

    return (
        <div>
            <Head>
                <Icons bobby={props.bob}>
                    <StyledLink onClick={() => props.handleModal()}>
                        <i className="fas fa-plus" />
                        Post
                    </StyledLink>
                    <StyledLink ref={props.test} onClick={props.handleClick}>
                        <i className="fas fa-filter" />
                        Filter
                    </StyledLink>
                    <StyledLink>
                        <i className="fas fa-bookmark" />
                        Faves
                    </StyledLink>
                </Icons>
                <Linked to="/dashboard">
                    <div className="p">
                        <div className='shif'>Shif</div>
                        <div className="t" />
                        <div className='radr'>radr</div>
                    </div>
                </Linked>
                <I
                    ref={bars}
                    className="fas fa-bars"
                    onClick={() => setOpen(!open)}
                />
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
                <Link to="/my-posts">
                    <h4>My Posts</h4>
                </Link>
                <Link to="/history">
                    <h4>Posts Applied For</h4>
                </Link>
            </SlideOut>
        </div>
    )
}

export default Header

const Icons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    ${(props) => 
       !props.bobby && css `
       visibility: hidden;
       ` 
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
    width: 300px;
`

const SlideOut = styled.div`
    color: white;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    position: fixed;
    width: 300px;
    height: 100vh;
    right: -300px;
    top: 0vh;
    z-index: 10;
    background: #4B5358;
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
    background-image: linear-gradient(
        to top,
        #1d2a3d,
        #233442,
        #2d3e47,
        #485051
    );
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
    background: rgb(56, 58, 61);
    color: white;
    font-size: 1rem;
    position: relative;
    left: 11vw;
    margin: 0px 6px;
`

const Linked = styled(Link)`
    position: relative;
    right: 6.7vw;
`
