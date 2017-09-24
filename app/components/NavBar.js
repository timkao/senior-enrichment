import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {

  render() {
    const activeStyle = {
      fontWeight: 'bold',
      color: 'black',
      backgroundColor: 'lightgrey'
    }

    return (
      <div>
        <ul className="nav nav-tabs">
          <li><NavLink to="/campuses" activeStyle={activeStyle}>Home</NavLink></li>
          <li><NavLink to="/students" activeStyle={activeStyle}>Studs.</NavLink></li>
        </ul>
      </div>
    )
  }
}
