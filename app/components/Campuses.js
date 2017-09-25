import React, { Component } from 'react'
import store from '../store'
import { fetchCampuses, deleteCampus, inputError } from '../reducers'
import { Route, Link } from 'react-router-dom'
import CampusStudent from './CampusStudent'
import CampusForm from './CampusForm'
import StudentForm from './StudentForm'

export default class Campuses extends Component {

  constructor() {
    super()
    this.state = store.getState()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const thunk = fetchCampuses()
    store.dispatch(thunk)

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  handleDelete(id) {
    const thunk = deleteCampus(id)
    store.dispatch(thunk)
  }

  handleClick() {
    store.dispatch(inputError(false))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { campuses } = this.state
    const { handleDelete, handleClick } = this
    return (
      <div className="row">
        <div className="col-lg-7">
          <div className="row">
            {
              campuses.map(function (campus) {
                return (
                  <div key={campus.id} className="col-lg-6">
                    <Link to={`/campuses/campus/${campus.id}`}><img className="img-rounded" src={campus.image} /></Link>
                    <div id="campus-fnc" className="row">
                      <Link to={`/campuses/addStudent/${campus.id}`}>
                        <div onClick={handleClick} className="col-lg-6 text-center btn btn-default">Join Campus</div>
                      </Link>
                      <Link to={'/campuses'}>
                        <div onClick={() => { handleDelete(campus.id) }} className="col-lg-6 text-center btn btn-default">Delt Campus</div>
                      </Link>
                    </div>
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
          <Route path="/campuses/addStudent/:campusId" render={(props) => <StudentForm info={props} />} />
        </div>
      </div>
    )
  }
}
