import { combineReducers } from 'redux'
import axios from 'axios'

// const initialState = {
//   campuses: [],
//   newCampusEntry: '',
//   students: []
// }

// Action label
const GET_CAMPUSES_FROM_SERVER = 'GET_CAMPUSES_FROM_SERVER'
const ADD_CAMPUS = 'ADD_CAMPUS'
const NEW_CAMPUS_ENTRY = 'NEW_CAMPUS_ENTRY'
const GET_STUDENTS_FROM_SERVER = 'GET_STUDENTS_FROM_SERVER'
const DELETE_STUDENT_FROM_SERVER = 'DELETE_STUDENT_FROM_SERVER'


// Action creator
export const getStudentsFromServer = function(students) {
  return {
    type: GET_STUDENTS_FROM_SERVER,
    students: students
  }
}

export const deleteStudentFromServer = function(id) {
  return {
    type: DELETE_STUDENT_FROM_SERVER,
    id: id
  }
}

export const deleteStudent = function(id) {
  return function(dispatch) {
    axios.delete(`/api/student/${id}`)
    .then(() => {
      const action = deleteStudentFromServer(id)
      dispatch(action)
    })
  }
}


export const fetchStudents = function() {
  return function(dispatch) {
    axios.get('/api/students')
    .then( res => res.data)
    .then( students => {
      const action = getStudentsFromServer(students)
      dispatch(action)
    })
  }
}

export const getCampusesFromServer = function(campuses) {
  return {
    type: GET_CAMPUSES_FROM_SERVER,
    campuses: campuses
  }
}

export const newCampusEntry = function(campusInput) {
  return {
    type: NEW_CAMPUS_ENTRY,
    newCampusEntry: campusInput
  }
}

export const addCampus = function(campus) {
  return {
    type: ADD_CAMPUS,
    campus: campus
  }
}

export const fetchCampuses = function() {
  return function(dispatch) {
    axios.get('/api/campuses')
    .then( res => res.data)
    .then( campuses => {
      const action = getCampusesFromServer(campuses)
      dispatch(action)
    })
  }
}

export const createCampus = function(messageData) {
  return function(dispatch) {
    axios.post('/api/campuses', messageData)
    .then( res => res.data )
    .then( campus => {
      const action = addCampus(campus)
      dispatch(action)
    })
  }
}

// Reducers
const campusesReducer = function(state = [], action) {
  switch (action.type) {
    case GET_CAMPUSES_FROM_SERVER:
      return action.campuses
    case ADD_CAMPUS:
      return [...state, action.campus]
    default:
      return state
  }
};

const studentsReducer = function(state = [], action) {
  switch (action.type) {
    case GET_STUDENTS_FROM_SERVER:
      return action.students
    case DELETE_STUDENT_FROM_SERVER:
      return state.filter( student => student.id !== action.id)
    default:
      return state
  }
};


// Reducers
// const rootReducer = function(state = initialState, action) {
//   switch (action.type) {
//     case GET_CAMPUSES_FROM_SERVER:
//       return Object.assign({}, state, {campuses: action.campuses})
//     case ADD_CAMPUS:
//       return Object.assign({}, state, {campuses: [...state.campuses, action.campus]})
//     default:
//       return state
//   }
// };

const entryReducer = function(state = '', action) {
  switch (action.type) {
    case NEW_CAMPUS_ENTRY:
      return action.newCampusEntry
    default:
      return state
  }
};


export default combineReducers({
  campuses: campusesReducer,
  newCampusEntry: entryReducer,
  students: studentsReducer
})
