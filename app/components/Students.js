import React, { Component } from 'react';
import store from '../store'
import { Route, Link } from 'react-router-dom'
import { fetchStudents } from '../reducers'
import Student from './Student'

export default class Students extends Component {

  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    const thunk = fetchStudents()
    store.dispatch(thunk)
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { students } = this.state
    console.log(students)
    return (
      <div className="row">
        <div className="col-lg-7 whole-student-list">
          <div id="student-list" className="row lead">
            <div className="col-lg-1 student-list-item">#</div>
            <div className="col-lg-2 student-list-item">Name</div>
            <div className="col-lg-2 student-list-item">Campus</div>
            <div className="col-lg-5 student-list-item">Email</div>
            <div className="col-lg-2"></div>
          </div>
          {
            students && students.map(student => {
              return (
                <Student student={student} />
              )
            })
          }

        </div>
        <div className="col-lg-1"><Link to="/students/addStudent"> <i id="to-add-student" className="glyphicon glyphicon-plus btn"></i> </Link><p id="add-student">Add Student</p></div>
        <div className="col-lg-4">
          {/* <Route path="/campuses/addStudent" component={StudentForm} /> */}
        </div>
      </div>
    )
  }
}
