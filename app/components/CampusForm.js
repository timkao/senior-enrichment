import React, { Component } from 'react'
import store from '../store'
import { createCampus, newCampusEntry } from '../reducers'


export default class CampusForm extends Component {

  constructor() {
    super()
    this.state = store.getState()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const thunk = createCampus({name: evt.target.name.value})
    store.dispatch(thunk)
    store.dispatch(newCampusEntry(''))
  }

  handleChange(evt) {
    const action = newCampusEntry(evt.target.value)
    store.dispatch(action)
  }

  render() {
    const { handleSubmit, handleChange } = this
    const campusEntry = this.state.newCampusEntry

    return (
      <div className="panel panel-default">
        <div className="panel-heading">Build a Campus</div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input onChange={handleChange} name="name" className="form-control" value={campusEntry} />
            </div>
            <div className="form-group">
              <button disabled={false} className="btn btn-primary btn-block">Save</button>
            </div>
          </form>
        </div>
      </div>)
  }
}
