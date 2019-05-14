import React, { useState, useRef } from "react"
import axios from "axios"
import styled from "styled-components"
import swal from "sweetalert"

const Login = (props) => {
    const [toggle, setToggle] = useState(false)
    const firstRef = useRef()
    const lastRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const employeeRef = useRef()
    const groupRef = useRef() 


    const handleLogin = async () => {
        let res = await axios.post("/auth/login", {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })

        if (res.data.loggedIn) props.history.push("/dashboard")
        else swal(res.data)
    }

    const handleRegister = async () => {
        let res = await axios.post("/auth/register", {
            user_first: firstRef.current.value,
            user_last: lastRef.current.value,
            user_email: emailRef.current.value,
            password: passwordRef.current.value,
            user_employee_id: employeeRef.current.value,
            group_id: groupRef.current.value,
        })
        if (res.data.loggedIn) props.history.push("/dashboard")
        else swal(res.data.message)
    }

    return !toggle ? (
        <OuterBody>
            <Body>
                <form onSubmit={handleLogin}>
                    <Input type="text" placeholder="Email" ref={emailRef} />
                    <Input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                    />
                    <Button>Login</Button>
                </form>
                <Button onClick={() => setToggle(true)}>Register</Button>
            </Body>
        </OuterBody>
    ) : (
        <OuterBody>
            <Body>
                <Input ref={firstRef} placeholder="First Name" />
                <Input ref={lastRef} placeholder="Last Name" />
                <Input ref={emailRef} placeholder="Email" />
                <Input ref={passwordRef} placeholder="Password" />
                <Input ref={employeeRef} placeholder="Employee ID" />
                <Select ref={groupRef}>
                    <option defaultValue>Select Group</option>
                    <option value="1">Reservation</option>
                    <option value="2">MCCM</option>
                    <option value="3">True Blue</option>
                    <option value="4">Crew</option>
                    <option value="5">Vacation</option>
                    <option value="6">Customer</option>
                </Select>
                <Button onClick={() => handleRegister()}>Register</Button>
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
    border-bottom: 0.5px solid black;
`
const Button = styled.button`
    display: flex;
    height: 30px;
    width: 100px;
    justify-content: center;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 3px 8px rgb(0, 0, 0, 0.18);

    &:hover {
    }
`
const Body = styled.div`
    height: 350px;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 5px 10px rgb(0, 0, 0, 0.18);
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
