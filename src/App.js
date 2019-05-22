import React from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import Post from "./Components/Post"
import PostView from "./Components/PostView"
import Chat from "./Components/Chat"
import MyPosts from "./Components/MyPosts"
import AcceptPost from './Components/AcceptPost'
import Registration from './Components/Registration'

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/post/:post_id" component={Post} />
                <Route path="/postview" component={PostView} />
                <Route path="/chat" component={Chat} />
                <Route path="/my-posts" component={MyPosts} />
                <Route path="/accept_post/:post_id" component={AcceptPost} />
                <Route path="/registration" component={Registration} />
            </Switch>
        </HashRouter>
    )
}

export default App
