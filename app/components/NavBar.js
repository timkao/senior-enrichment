import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {

  render() {
    const activeStyle = {
      fontWeight: 'bold',
      color: 'black',
      backgroundColor: '#9FA9A0',
    }

    return (
      <div>
        <ul className="nav nav-tabs">
          <li><NavLink to="/campuses" activeStyle={activeStyle}>Home</NavLink></li>
          <li><NavLink to="/students" activeStyle={activeStyle}>Students</NavLink></li>
        </ul>
      </div>
    )
  }
}
