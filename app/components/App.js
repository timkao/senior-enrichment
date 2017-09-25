import React, { Component } from 'react';
import NavBar from './NavBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Campuses from './Campuses'
import Students from './Students'
import store from '../store'
import { fetchCampuses, fetchStudents } from '../reducers'



export default class App extends Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    const thunk = fetchCampuses()
    store.dispatch(thunk)
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
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
