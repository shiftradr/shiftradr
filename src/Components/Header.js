import React, { useState } from 'react'
import styled from 'styled-components'




const Header = () => {
    return (
        <Head/>
    )
}

export default Header


const Head = styled.div`
height: 8vh;
width: 100vw;
background: grey;
display: flex;
justify-content: space-evenly;
align-items: center;
position: fixed;
top: 0;

`