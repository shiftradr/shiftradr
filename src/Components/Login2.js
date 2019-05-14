import React, { useState, useRef } from "react"
import "./Login2.css"
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
const Login2 = (props) => {
    const groupRef = useRef()
    const [toggle, setToggle] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [state, setState] = useState({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        employeeId: null,
        groupId: null,
        formErrors: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            employeeId: "",
            groupId: "",
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
      EmployeeId: ${state.employeeId}
      GroupId: ${groupRef.current.value}
      `)
        } else {
            console.error("Form Invalid - Display Error Message")
        }
    }

    const handleLogin = async () => {
        try {
            console.log(12121, email)
            let res = await axios.post("/auth/login", {
                email: email,
                password: password,
            })
            console.log(res.data)
            if (res.data.loggedIn) props.history.push("/dashboard")
            else swal(res.data)
        } catch (error) {
            console.log({ error })
            // res.status(500).send(error);
        }
    }

    const handleRegister = async () => {
        let res = await axios.post("/auth/register", {
            user_first: state.firstName,
            user_last: state.lastName,
            user_email: state.email,
            password: state.password,
            user_employee_id: state.employeeId,
            group_id: groupRef.current.value,
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
                formErrors.firstName = value.length < 1 ? "Required Field" : ""
                break
            case "lastName":
                formErrors.lastName = value.length < 1 ? "Required Field" : ""
                break
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address"
                break
            case "password":
                formErrors.password = value.length < 6 ? "minimum 6 characaters required" : ""
                break
            case "employeeId":
                formErrors.employeeId = value.length < 6 ? "Required Field" : ""
                break
            case "groupId":
                formErrors.groupId = value.length < 1 ? "Required Field" : ""
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
                <h1 className="registerTitle">Create Account</h1>
                <form
                    className="registerForm"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="firstName">
                        <label className="label" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            className={
                                formErrors.firstName.length > 0
                                    ? "error regInput"
                                    : "regInput"
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
                        <label className="label" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className={
                                formErrors.lastName.length > 0
                                    ? "error regInput"
                                    : "regInput"
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
                        <label className="label" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            className={
                                formErrors.email.length > 0
                                    ? "error regInput"
                                    : "regInput"
                            }
                            placeholder="Email"
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
                        <label className="label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            className={
                                formErrors.password.length > 0
                                    ? "error regInput"
                                    : "regInput"
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
                    <div className="employeeId">
                        <label className="label" htmlFor="employeeId">Employee ID</label>
                        <input
                            type="text"
                            className={
                                formErrors.employeeId.length > 0
                                    ? "error regInput"
                                    : "regInput"
                            }
                            placeholder="Employee ID"
                            name="employeeId"
                            noValidate
                            onChange={handleChange}
                        />
                        {formErrors.employeeId.length > 0 && (
                            <span className="errorMessage">
                                {formErrors.employeeId}
                            </span>
                        )}
                    </div>
                    <label className="label" htmlFor="groupId">Department</label>
                    <select
                        ref={groupRef}
                        className="groupId"
                    >
                        <option defaultValue>Select Group</option>
                        <option value="1">Crew</option>
                        <option value="2">Customer</option>
                        <option value="3">MCCM</option>
                        <option value="4">Reservations</option>
                        <option value="5">True</option>
                        <option value="6">Vacations</option>
                    </select>
                    <div className="createAccount">
                        <button
                            className="regButton"
                            type="submit"
                            onClick={() => handleRegister()}
                        >
                            {" "}
                            Create Account
                        </button>
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
                <h1 className="registerTitle">Login</h1>
                <form className="loginForm">
                    <input
                        className="regInput"
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="regInput"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="createAccount">
                        <button className="regButton" onClick={handleLogin}>
                            Login
                        </button>
                        <small onClick={() => setToggle(!toggle)}>
                            Don't have an account? Click here to register!
                        </small>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login2
