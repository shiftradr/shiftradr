import React, { useState } from "react"
import "./Login.css"
import axios from "axios"
import swal from "sweetalert"
import { Link } from "react-router-dom"

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post("/auth/login", {
                email: email,
                password: password,
            })
            if (res.data.loggedIn) props.history.push("/dashboard")
            else swal(res.data)
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <div className="wrapper">
            <div className="pp">
                <div className="shiff">Shif</div>
                <div className="tt" />
                <div className="radrr">radr</div>
            </div>
            <div className="form-wrapper">
                <h1 className="registerTitle">Login</h1>
                <form className="loginForm" onSubmit={handleLogin}>
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
                        <button className="regButton" type="submit">
                            Login
                        </button>
                        <Link
                            className="borderbottom"
                            style={{ textDecoration: "none", color: "#888686" }}
                            to="/registration"
                        >
                            Don't have an account? Click here to register!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login
