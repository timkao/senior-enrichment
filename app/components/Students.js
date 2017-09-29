import React, { Component } from 'react';
import store from '../store'
import { Route, Link } from 'react-router-dom'
import { fetchStudents, newEmailEntry, newStudentEntry, newCampusId, inputError } from '../reducers'
import Student from './Student'
import StudentForm from './StudentForm'

export default class Students extends Component {

  constructor() {
    super()
    this.state = store.getState()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const thunk = fetchStudents()
    store.dispatch(thunk)
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  handleClick(evt) {
    // reset form
    store.dispatch(newCampusId(0))
    store.dispatch(newEmailEntry(''))
    store.dispatch(newStudentEntry(''))
    store.dispatch(inputError(false))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { students } = this.state
    const { handleClick } = this
    return (
      <div className="row">
        <div className="col-lg-7 whole-student-list">
          <div id="student-list" className="row lead">
            <div className="col-lg-1 student-list-item col-md-1 col-sm-1 col-xs-1">#</div>
            <div className="col-lg-2 student-list-item col-md-2 col-sm-2 col-xs-2">Name</div>
            <div className="col-lg-2 student-list-item col-md-2 col-sm-2 col-xs-2">Campus</div>
            <div className="col-lg-5 student-list-item col-md-5 col-sm-5 col-xs-5">Email</div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
          </div>
          {
            students && students.map(student => {
              return (
                <div key={student.id}>
                  <Student student={student} />
                </div>
              )
            })
          }

        </div>
        <div className="col-lg-1">
          <Link to="/students/addStudent">
            <i id="to-add-student" onClick={handleClick} className="glyphicon glyphicon-plus btn"></i>
          </Link>
          <p id="add-student">Add Student</p>
        </div>

        <div className="col-lg-4">
          <Route path="/students/addStudent" component={StudentForm} />
          <Route path="/students/editStudent/:studentId" render={(props) => <StudentForm studentDefault={props} />} />
        </div>
      </div>
    )
  }
}
