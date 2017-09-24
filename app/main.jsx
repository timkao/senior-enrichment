'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom';

import store from './store'
import App from './components/App'

render (
  <Router>
  <App />
  </Router>,
  document.getElementById('main')
)
