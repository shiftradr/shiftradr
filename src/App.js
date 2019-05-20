import React from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import Post from "./Components/Post"
import PostView from "./Components/PostView"
import MyPosts from "./Components/MyPosts"
import AcceptPost from './Components/AcceptPost'

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/post/:post_id" component={Post} />
                <Route path="/postview" component={PostView} />
                <Route path="/my-posts" component={MyPosts} />
                <Route path="/accept_post/:post_id" component={AcceptPost}/>
            </Switch>
        </HashRouter>
    )
}

export default App
