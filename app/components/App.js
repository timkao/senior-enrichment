import React, { Component } from 'react';
import NavBar from './NavBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Campuses from './Campuses'
import Students from './Students'
import store from '../store'
import { fetchCampuses, fetchStudents } from '../reducers'
import SingleStudent from './SingleStudent'

export default class App extends Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    store.dispatch(fetchCampuses())
    store.dispatch(fetchStudents())
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
            <Route path="/student/:id" component={SingleStudent} />
            <Redirect to='/campuses' />
          </Switch>
      </div>
    )
  }
}
