import React, { Component } from 'react';
import store from '../store'
import { deleteStudent } from '../reducers'


export default class Student extends Component {

  constructor() {
    super()
    this.state = store.getState()
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(evt) {
    const thunk = deleteStudent(this.props.student.id)
    store.dispatch(thunk)
  }

  render() {
    const { student } = this.props
    const { handleDelete } = this

    return (
      <div key={student.id} className="row lead">
        <div className="col-lg-1">{student.id}</div>
        <div className="col-lg-2">{student.name}</div>
        <div className="col-lg-2">{student.campus.name}</div>
        <div className="col-lg-5">{student.email}</div>
        <div className="col-lg-1"><i onClick={handleDelete} style={{ color: '#A23607' }} className="glyphicon glyphicon-trash btn"></i></div>
      </div>
    )

  }
}
