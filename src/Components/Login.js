import React, { useState, useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'




const Login = () => {
    const [toggle, setToggle] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const emailRef = useRef()
    const passwordRef = useRef()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setEmail(emailRef.current.value)
        await setPassword(passwordRef.current.value)
        let res = axios
            .post('/auth/login', { email, password })
            if (res.loggedIn) {
                console.log(res)
            }
    }

    return !toggle ?
        (
            <OuterBody>
                <Body>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Input type="text" placeholder="Email" ref={emailRef} />
                        <Input type="password" placeholder="Password" ref={passwordRef} />
                        <Button>Login</Button>
                    </form>
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
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                    <Input placeholder="Employee ID" />
                    <Select>
                        <option defaultValue>Select Group</option>
                        <option value="1" >Reservation</option>
                        <option value="2" >MCCM</option>
                        <option value="3" >True Blue</option>
                        <option value="4" >Crew</option>
                        <option value="5" >Vacation</option>
                        <option value="6" >Customer</option>
                    </Select>
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

const Select = styled.select`
background-color: white;
height: 30px;
width: 110px;
`