import React, { Component } from 'react'
import store from '../store'
import { newStudentEntry, newEmailEntry, newCampusId, fetchCampuses, addStudent, inputError, updateStudent } from '../reducers'

export default class StudentForm extends Component {

  constructor() {
    super()
    this.state = store.getState()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    store.dispatch(inputError(false))
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const name = evt.target.name.value
    const email = this.state.newEmailEntry
    let campusId = Number(evt.target.campusId.value)
    campusId = campusId === 0 ? null : campusId
    const messageData = {name, email, campusId}

    if (this.props.studentDefault) {
      const studentId = this.props.studentDefault.match.params.studentId
      const thunk = updateStudent(studentId, {email, campusId})
      store.dispatch(thunk)
    }
    else {
      const thunk = addStudent(messageData)
      store.dispatch(thunk)
    }
  }

  handleChange(evt) {
    if (evt.target.name === 'name') {
      const action = newStudentEntry(evt.target.value)
      store.dispatch(action)
    }
    else if (evt.target.name === 'email') {
      const action = newEmailEntry(evt.target.value)
      store.dispatch(action)
    }
    else if (evt.target.name === 'campusId') {
      const action = newCampusId(evt.target.value)
      store.dispatch(action)
    }
  }

  render() {
    const { handleSubmit, handleChange } = this
    const studentEntry = this.state.newStudentEntry
    const emailEntry = this.state.newEmailEntry
    const campusId = this.state.newCampusId
    const campuses = this.state.campuses
    const students = this.state.students
    const errorMessage = this.state.inputError
    let defaultCampusId = this.props.info !== undefined ? this.props.info.match.params.campusId : undefined
    let defaultStudentId = this.props.studentDefault !== undefined ? this.props.studentDefault.match.params.studentId : undefined
    let panelHeading = 'New Student Form'
    let defaultStudentName;
    if (defaultStudentId) {
      defaultStudentName = students.filter(student => Number(defaultStudentId) === student.id)[0]
      panelHeading = 'Edit Student'
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">{panelHeading}</div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
            {
              errorMessage && <div className="alert alert-danger">
                Name should not be null. Email format should be correct
              </div>
            }
            <div className="form-group">
              <label>Name</label>
              <input onChange={handleChange} disabled={defaultStudentId && true} name="name" className="form-control" value={ defaultStudentName && defaultStudentName.name || studentEntry} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input onChange={handleChange} name="email" className="form-control" value={emailEntry} />
            </div>
            <div className="form-group">
              <label>Campus</label>
              <select name="campusId" disabled={defaultCampusId && true} onChange={handleChange} value={ defaultCampusId || campusId} className="form-control">
                <option value={0}>--none--</option>
                {
                   campuses.map(function (campus) {
                    return (
                      <option key={campus.id} value={campus.id}>{campus.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
