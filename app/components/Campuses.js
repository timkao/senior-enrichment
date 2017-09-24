import React, { Component } from 'react'
import store from '../store'
import { fetchCampuses } from '../reducers'
import { Route, Link } from 'react-router-dom'
import CampusStudent from './CampusStudent'
import CampusForm from './CampusForm'

export default class Campuses extends Component {

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
    const { campuses } = this.state
    return (
      <div className="row">
        <div className="col-lg-7">
          <div className="row">
            {
              campuses.map(function (campus) {
                return (
                  <div key={campus.id} className="col-lg-6">
                    <Link to={`/campuses/campus/${campus.id}`}><img className="img-rounded" src={campus.image} /></Link>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="col-lg-1"><Link to="/campuses/addCampus"> <i className="glyphicon glyphicon-plus btn"></i> </Link><p id="add-campus">Add Campus</p></div>
        <div className="col-lg-4">
          <Route exact path="/campuses/campus/:campusId" component={CampusStudent} />
          <Route path="/campuses/addCampus" component={CampusForm} />
        </div>
      </div>
    )
  }
}
