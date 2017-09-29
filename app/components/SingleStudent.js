import React, { Component } from 'react';
import store from '../store'
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
    const studentId = Number(this.props.match.params.id)
    const { students } = this.state
    const student = students.filter(_student => _student.id === studentId)[0]

    return (
      <div id="student-profile" className="row lead">
        <div className="col-lg-6">
          <ul className="list-group">
            <li style={{ backgroundColor: '#BCAD90' }} className="list-group-item"><img src={student.avatar} className="img-responsive img-thumbnail" /></li>
            <li className="list-group-item">Student ID: #{student && student.id}</li>
            <li className="list-group-item">Student Name: {student && student.name}</li>
            <li className="list-group-item">Student Email: {student && student.email}</li>
          </ul>
        </div>
        <div className="col-lg-6">
          <Link to={`/campuses/campus/${student && student.campus && student.campus.id}`}>
            <img id="campus-image" className="img-rounded" src={student && student.campus && student.campus.image ? student.campus.image : './tbdicon.jpg'}></img>
          </Link>
        </div>
      </div>
    )

  }
}
