import React, { Component } from 'react'
import store from '../store'
import { Link } from 'react-router-dom'


export default class SingleCampus extends Component {

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
    const { campuses } = this.state
    const campus = campuses.filter( cps => cps.id === Number(this.props.match.params.campusId))[0]
    return (
      <div className="panel panel-default">
        <div className="panel panel-heading">{campus && campus.name} Campus</div>
        <div className="panle panel-body">
          {
            campus && campus.students && campus.students.map( student => {
              return (
                <Link to={`/student/${student.id}` } key={student.id}><li className="lead" >{student.name}</li></Link>
              )
            })
          }
          </div>
      </div>

    )
  }
}
