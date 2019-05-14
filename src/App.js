import React from "react"
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login2 from './Components/Login2'
import Dashboard from './Components/Dashboard'
import Post from './Components/Post'
import PostView from './Components/PostView'
import Chat from './Components/Chat'


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Login2} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/post' component={Post} />
        <Route path='/postview' component={PostView} />
        <Route path='/chat' component={Chat} />
      </Switch>
    </HashRouter>
  );
}

export default App
