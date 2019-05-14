import React, { useState } from 'react'
import Header from './Header'
import styled, { css } from 'styled-components'


const Search = (props) => {
    // const [toggle, setToggle] = useState(false)
    return (
        <div>
            <Header>
                <Filter>
                    <Input type='date' />
                    <Input type='date' />
                    <Input type='checkbox' {...props} />
                    <Input type='checkbox' {...props} />
                    <Input type='checkbox' {...props} />
                </Filter>
            </Header>
        </div>
    )
}

export default Search


const Filter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8vh;
    height: 92vh;
    width: 100vw;
`
const Input = styled.input`
    display: flex;
    height: 20px;
    width: 100px;
    margin: 10px;
    border: none;
    outline: none;
    border-bottom: 0.5px solid black;
`
