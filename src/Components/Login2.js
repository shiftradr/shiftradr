import React, { useState } from "react"
import "./Login2.css"
import styled from "styled-components"
import axios from "axios"
import swal from "sweetalert"

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
)
const formValid = ({ formErrors, ...rest }) => {
    let valid = true
    // validates form errors being empty
    Object.values(formErrors).forEach((val) => {
        val.length > 0 && (valid = false)
    })
    //validates the from was filled out
    Object.values(rest).forEach((val) => {
        val === null && (valid = false)
    })
    return valid
}
const Login = (props) => {
    const [toggle, setToggle] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [state, setState] = useState({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        formErrors: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValid(state)) {
            console.log(`
      ----SUBMITTING---
      First Name: ${state.firstName}
      Last Name: ${state.lastName}
      Email: ${state.email}
      Password: ${state.password}
      `)
        } else {
            console.error("Form Invalid - Display Error Message")
        }
    }

    const handleLogin = async () => {
        console.log(12121, email)
        let res = await axios.post("/auth/login", {
            email: email,
            password: password,
        })

        if (res.data.loggedIn) props.history.push("/dashboard")
        else swal(res.data)
    }
    
    const handleRegister = async () => {
        let res = await axios.post("/auth/register", {
            user_first: state.firstName,
            user_last: state.lastName,
            user_email: state.email,
            password: state.password,
            user_employee_id: 345,
            group_id: 1,
        })
        if (res.data.loggedIn) props.history.push("/dashboard")
        else swal(res.data.message)
    }
    
    const { formErrors } = state
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        let formErrors = state.formErrors
        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characters required" : ""
                break
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "minimum 2 characters required" : ""
                break
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address"
                break
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : ""
                break
            default:
                break
        }
        setState({
            ...state,
            formErrors,
            ...state,
            [name]: value,
        })
    }

    return toggle ? (
        <div className="wrapper">
            <div className="form-wrapper">
                <h1>Create Account</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="firstName">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className={
                                formErrors.firstName.length > 0
                                    ? "erreor"
                                    : null
                            }
                            placeholder="First Name"
                            name="firstName"
                            noValidate
                            onChange={handleChange}
                        />
                        {formErrors.firstName.length > 0 && (
                            <span className="errorMessage">
                                {formErrors.firstName}
                            </span>
                        )}
                    </div>
                    <div className="lastName">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className={
                                formErrors.lastName.length > 0 ? "error" : null
                            }
                            placeholder="Last Name"
                            name="lastName"
                            noValidate
                            onChange={handleChange}
                        />
                        {formErrors.lastName.length > 0 && (
                            <span className="errorMessage">
                                {formErrors.lastName}
                            </span>
                        )}
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className={
                                formErrors.email.length > 0 ? "error" : null
                            }
                            placeholder="email"
                            name="email"
                            noValidate
                            onChange={handleChange}
                        />
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">
                                {formErrors.email}
                            </span>
                        )}
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className={
                                formErrors.password.length > 0 ? "error" : null
                            }
                            placeholder="Password"
                            name="password"
                            noValidate
                            onChange={handleChange}
                        />
                        {formErrors.password.length > 0 && (
                            <span className="errorMessage">
                                {formErrors.password}
                            </span>
                        )}
                    </div>
                    <div className="createAccount">
                        <button type="submit" onClick={() => handleRegister()}> Create Account</button>
                        <small onClick={() => setToggle(!toggle)}>
                            Already Have an Account?
                        </small>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <div className="wrapper">
            <div className="form-wrapper">
                <form>
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </form>
                <button onClick={() => setToggle(!toggle)}>Register</button>
            </div>
        </div>
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
