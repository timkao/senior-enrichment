import React, { Component } from 'react'
import store from '../store'
import { fetchCampuses, deleteCampus, inputError, newEmailEntry, newCampusId, newStudentEntry, newCampusEntry } from '../reducers'
import { Route, Link, NavLink } from 'react-router-dom'
import SingleCampus from './SingleCampus'
import CampusForm from './CampusForm'
import StudentForm from './StudentForm'

export default class Campuses extends Component {

  constructor() {
    super()
    this.state = store.getState()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handlePlusClick = this.handlePlusClick.bind(this)
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

  handleJoin() {
    // reset form value
    store.dispatch(inputError(false))
    store.dispatch(newEmailEntry(''))
    store.dispatch(newStudentEntry(''))
    store.dispatch(newCampusId(0))
    store.dispatch(inputError(false))
  }

  handlePlusClick() {
    // reset form value
    const action = newCampusEntry(name)
    store.dispatch(action)
  }

  handleEdit(name) {
    // reset form value
    const action = newCampusEntry(name)
    store.dispatch(action)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { campuses } = this.state
    const { handleDelete, handleJoin, handleEdit, handlePlusClick } = this
    return (
      <div className="row">
        <div className="col-lg-7">
          <div id="campus-list" className="row">
            {
              campuses.map(function (campus) {
                return (
                  <div key={campus.id} className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <Link to={`/campuses/campus/${campus.id}`}>
                      <img className="img-rounded" src={campus.image} />
                    </Link>
                    <div id="campus-fnc" className="row">
                      <Link to={`/campuses/addStudent/${campus.id}`}>
                        <div onClick={handleJoin} className="col-lg-4 text-center btn btn-default">Join Campus</div>
                      </Link>
                      <Link to={`/campuses/editCampus/${campus.id}`}>
                        <div onClick={() => { handleEdit(campus.name) }} className="col-lg-4 text-center btn btn-default">Edit Campus</div>
                      </Link>
                      <Link to={'/campuses/addCampus'}>
                        <div onClick={() => { handleDelete(campus.id) }} className="col-lg-4 text-center btn btn-default">Delt Campus</div>
                      </Link>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="col-lg-1"><Link to="/campuses/addCampus"> <i onClick={handlePlusClick} className="glyphicon glyphicon-plus btn"></i> </Link><p id="add-campus">Add Campus</p></div>
        <div className="col-lg-4">
          <Route excat path="/campuses/addCampus" component={CampusForm} />
          <Route excat path="/campuses/editCampus/:campusId" component={CampusForm} />
          <Route exact path="/campuses/campus/:campusId" component={SingleCampus} />
          <Route path="/campuses/addStudent/:campusId" render={(props) => <StudentForm info={props} />} />
        </div>
      </div>
    )
  }
}
