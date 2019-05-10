import React from "react"
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Post from './Components/Post'
import PostView from './Components/PostView'
import Chat from './Components/Chat'

import "./App.css"

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/post' component={Post} />
        <Route path='/postview' component={PostView} />
        <Route path='/chat' component={Chat} />
      </Switch>
    </HashRouter>
  );
}

export default App
