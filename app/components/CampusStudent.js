import React, { Component } from 'react'
import store from '../store'

export default class CampusStudent extends Component {

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
    console.log(campus)
    return (
      <div className="panel panel-default">
        <div className="panel panel-heading">{campus && campus.name} Campus</div>
        <div className="panle panel-body">
          {
            campus && campus.students && campus.students.map( student => {
              return (
                <li className="lead" key={student.id}>{student.name}</li>
              )
            })
          }
          </div>
      </div>

    )
  }
}
