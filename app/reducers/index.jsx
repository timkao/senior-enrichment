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
const NEW_STUDENT_ENTRY = 'NEW_STUDENT_ENTRY'
const NEW_EMAIL_ENTRY = 'NEW_EMAIL_ENTRY'
const NEW_CAMPUSID = 'NEW_CAMPUSID'
const ADD_STUDENT_TO_SERVER = 'ADD_STUDENT_TO_SERVER'
const INPUT_ERROR = 'INPUT_ERROR'
const DELETE_CAMPUS_FROM_SERVER = 'DELETE_CAMPUS_FROM_SERVER'
const UPDATE_STUDENT_FROM_SERVER = 'UPDATE_STUDENT_FROM_SERVER'

// Action creator

export const updateStudentFromServer = function (student) {
  return {
    type: UPDATE_STUDENT_FROM_SERVER,
    student: student
  }
}

export const addStudentToServer = function (student) {
  return {
    type: ADD_STUDENT_TO_SERVER,
    student: student
  }
}

export const deletCampusFromServer = function (id) {
  return {
    type: DELETE_CAMPUS_FROM_SERVER,
    id: id
  }
}

export const inputError = function (status) {
  return {
    type: INPUT_ERROR,
    status: status
  }
}

export const newStudentEntry = function (studentInput) {
  return {
    type: NEW_STUDENT_ENTRY,
    newStudentEntry: studentInput
  }
}

export const newEmailEntry = function (emailInput) {
  return {
    type: NEW_EMAIL_ENTRY,
    newEmailEntry: emailInput
  }
}

export const newCampusId = function (campusId) {
  return {
    type: NEW_CAMPUSID,
    campusId: campusId
  }
}

export const getStudentsFromServer = function (students) {
  return {
    type: GET_STUDENTS_FROM_SERVER,
    students: students
  }
}

export const deleteStudentFromServer = function (id) {
  return {
    type: DELETE_STUDENT_FROM_SERVER,
    id: id
  }
}


export const deleteStudent = function (id) {
  return function (dispatch) {
    axios.delete(`/api/student/${id}`)
      .then(() => {
        const action = deleteStudentFromServer(id)
        dispatch(action)
      })
  }
}


export const fetchStudents = function () {
  return function (dispatch) {
    axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudentsFromServer(students)
        dispatch(action)
      })
  }
}

export const getCampusesFromServer = function (campuses) {
  return {
    type: GET_CAMPUSES_FROM_SERVER,
    campuses: campuses
  }
}

export const newCampusEntry = function (campusInput) {
  return {
    type: NEW_CAMPUS_ENTRY,
    newCampusEntry: campusInput
  }
}

export const addCampus = function (campus) {
  return {
    type: ADD_CAMPUS,
    campus: campus
  }
}

export const fetchCampuses = function () {
  return function (dispatch) {
    axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampusesFromServer(campuses)
        dispatch(action)
      })
  }
}

export const createCampus = function (messageData) {
  return function (dispatch) {
    axios.post('/api/campuses', messageData)
      .then(res => res.data)
      .then(campus => {
        const action = addCampus(campus)
        dispatch(action)
      })
  }
}

export const deleteCampus = function (id) {
  return function (dispatch) {
    axios.delete(`/api/campus/${id}`)
      .then(res => res.data)
      .then(() => {
        const action = deletCampusFromServer(id)
        dispatch(action)
      })
  }
}

export const updateCampus = function (id, messageData) {
  return function (dispatch) {
    axios.put(`/api/campus/${id}`, messageData)
      .then(res => res.data)
      .then(campus => {
        if (campus === 'wrong') {
          dispatch(inputError(true))
        }
        dispatch(fetchCampuses())
      })
  }
}

export const addStudent = function (messageData) {
  return function (dispatch) {
    axios.post('/api/student', messageData)
      .then(res => res.data)
      .then(student => {
        if (student !== 'wrong') {
          const action = addStudentToServer(student)
          dispatch(action)
          dispatch(newStudentEntry(''))
          dispatch(newEmailEntry(''))
          dispatch(newCampusId(0))
          dispatch(inputError(false))
        }
        else {
          dispatch(inputError(true))
        }
        dispatch(fetchStudents())
        dispatch(fetchCampuses())
      })
  }
}

export const updateStudent = function (id, messageData) {
  return function (dispatch) {
    axios.put(`/api/student/${id}`, messageData)
      .then(res => res.data)
      .then(student => {
        if (student === 'wrong') {
          dispatch(inputError(true))
        }
        dispatch(fetchStudents())
      })
  }
}

// Reducers
const campusesReducer = function (state = [], action) {
  switch (action.type) {
    case GET_CAMPUSES_FROM_SERVER:
      return action.campuses
    case ADD_CAMPUS:
      return [...state, action.campus]
    case DELETE_CAMPUS_FROM_SERVER:
      return state.filter(campus => campus.id !== action.id)
    default:
      return state
  }
};

const studentsReducer = function (state = [], action) {
  switch (action.type) {
    case GET_STUDENTS_FROM_SERVER:
      return action.students
    case DELETE_STUDENT_FROM_SERVER:
      return state.filter(student => student.id !== action.id)
    case ADD_STUDENT_TO_SERVER:
      return [...state, action.student]
    case UPDATE_STUDENT_FROM_SERVER:
      return [...state.filter(student => student.id !== action.student.id), action.student]
    default:
      return state
  }
};

const entryReducer = function (state = '', action) {
  switch (action.type) {
    case NEW_CAMPUS_ENTRY:
      return action.newCampusEntry
    default:
      return state
  }
};

const newStudentEntryReducer = function (state = '', action) {
  switch (action.type) {
    case NEW_STUDENT_ENTRY:
      return action.newStudentEntry
    default:
      return state
  }
};

const newEmailEntryReducer = function (state = '', action) {
  switch (action.type) {
    case NEW_EMAIL_ENTRY:
      return action.newEmailEntry
    default:
      return state
  }
};

const newCampuIdReducer = function (state = 0, action) {
  switch (action.type) {
    case NEW_CAMPUSID:
      return action.campusId
    default:
      return state
  }
};

const inputErrorReducer = function (state = false, action) {
  switch (action.type) {
    case INPUT_ERROR:
      return action.status
    default:
      return state
  }
};

export default combineReducers({
  campuses: campusesReducer,
  newCampusEntry: entryReducer,
  students: studentsReducer,
  newStudentEntry: newStudentEntryReducer,
  newEmailEntry: newEmailEntryReducer,
  newCampusId: newCampuIdReducer,
  inputError: inputErrorReducer
})
