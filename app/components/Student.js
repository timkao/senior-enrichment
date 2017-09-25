import React, { Component } from 'react';
import store from '../store'
import { deleteStudent, newEmailEntry, newStudentEntry, newCampusId, inputError } from '../reducers'
import { Link } from 'react-router-dom'


export default class Student extends Component {

  constructor() {
    super()
    this.state = store.getState()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleDelete(evt) {
    const thunk = deleteStudent(this.props.student.id)
    store.dispatch(thunk)
  }

  handleEdit(evt) {
    store.dispatch(newEmailEntry(''))
    store.dispatch(newStudentEntry(''))
    store.dispatch(newCampusId(0))
    store.dispatch(inputError(false))
  }

  render() {
    const { student } = this.props
    const { handleDelete, handleEdit } = this

    return (
      <div className="row lead">
        <div className="col-lg-1">{student.id}</div>
        <div className="col-lg-2">{student.name}</div>
        <div className="col-lg-2">{ student.campus && student.campus.name}</div>
        <div className="col-lg-5">{student.email}</div>
        <div className="col-lg-2">
          <i onClick={handleDelete} style={{ color: '#A23607' }} className="glyphicon glyphicon-trash btn"></i>
          <Link to={`/students/editStudent/${student.id}`}><i onClick={handleEdit} style={{ color: '#A23607' }} className="glyphicon glyphicon-pencil"></i></Link>
        </div>
      </div>
    )

  }
}
