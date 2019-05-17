import React from "react"
import styled from "styled-components"
import Picker from "./PostView"

const PostModal = (props) => {
    return (
        <Outer>
            <Inner>
                <Picker
                    getData={props.getData}
                    handleModal={props.handleModal}
                />
            </Inner>
        </Outer>
    )
}

export default PostModal

const Inner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 40;
    background: white;
    padding: 50px 80px 60px 80px;
    border-radius: 10px;
    transition: 1s ease-in-out;
`

const Outer = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    padding: 80px;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    margin-top: 8vh;
    transition: 1s ease-in-out;
`
