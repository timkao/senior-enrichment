import React, { Component } from 'react';
import store from '../store'
import {} from '../reducers'
import { Link } from 'react-router-dom'


export default class SingleStudent extends Component {

  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { student } = this.props
    const { handleDelete, handleEdit } = this

    return (
      <div className="row lead">
        <div className="col-lg-1">{student.id}</div>
        <div className="col-lg-2">{student.name}</div>
        <div className="col-lg-2">{student.campus && student.campus.name}</div>
        <div className="col-lg-5">{student.email}</div>
        <div className="col-lg-2">
          <i onClick={handleDelete} style={{ color: '#A23607' }} className="glyphicon glyphicon-trash"></i>
          <i style={{ color: '#A23607' }} className="glyphicon glyphicon-eye-open btn"></i>
          <Link to={`/students/editStudent/${student.id}`}><i onClick={handleEdit} style={{ color: '#A23607' }} className="glyphicon glyphicon-pencil"></i></Link>
        </div>
      </div>
    )

  }
}
