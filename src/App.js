import React from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import Post from "./Components/Post"
import PostView from "./Components/PostView"
import MyPosts from "./Components/MyPosts"
import AcceptPost from './Components/AcceptPost'
import AppliedHistory from "./Components/AppliedHistory";
import AppliedPost from './Components/AppliedPost'

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
                <Route path="/history" component={AppliedHistory}/>
                <Route path="/applied-for-post/:post_id" component={AppliedPost}/>
            </Switch>
        </HashRouter>
    )
}

export default App
