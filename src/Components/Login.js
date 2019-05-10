import React, { useState } from 'react'
import styled from 'styled-components'




const Login = () => {
    const [toggle, setToggle] = useState(false)

    return !toggle ? 
    (
        <OuterBody>
            <Body>
                <Input placeholder="Email" />
                <Input placeholder="Password" />
                <Button>Login</Button>
                <Button
                    onClick={() => setToggle(true)}
                >Register</Button>
            </Body>
        </OuterBody>
    )
    :
    (
        <OuterBody>
            <Body>
                <Input placeholder="First Name"/>
                <Input placeholder="Last Name"/>
                <Input placeholder="Email"/>
                <Input placeholder="Password"/>
                <Input placeholder="Employee ID"/>
                <select>
                    <option defaultValue>Select Group</option>
                    <option value="1" >Reservation</option>
                    <option value="2" >MCCM</option>
                    <option value="3" >True Blue</option>
                    <option value="4" >Crew</option>
                    <option value="5" >Vacation</option>
                    <option value="6" >Customer</option>
                </select>
            </Body>
        </OuterBody>
    )
}




export default Login



const Input = styled.input`
display: flex;
height: 20px;
width: 100px;
margin: 10px;
border: none;
outline: none;
border-bottom: .5px solid black;
`
const Button = styled.button`
display: flex;
height: 30px;
width: 100px;
justify-content: center;
margin: 10px;
border-radius: 5px;
box-shadow: 0 3px 8px rgb(0,0,0,0.18);

&:hover{
    
}
`
const Body = styled.div`
height: 350px;
width: 400px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
box-shadow: 0px 5px 10px rgb(0,0,0,0.18);
border-radius: 10px;
`

const OuterBody = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`