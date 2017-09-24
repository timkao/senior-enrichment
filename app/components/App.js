import React, { Component } from 'react';
import NavBar from './NavBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Campuses from './Campuses'
import Students from './Students'

export default class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <NavBar />
          <Switch>
            <Route path="/campuses" component={Campuses} />
            <Route path="/students" component={Students} />
            <Redirect to='/campuses' />
          </Switch>
      </div>
    )
  }
}
