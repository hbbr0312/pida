import { LOGOUT, LOGIN } from "../actions"
import { createStore, combineReducers } from "redux"

const initialState = {
  login: false
}

const handlesign = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return Object.assign({}, state, {
        login: false
      })
    case LOGIN:
      return Object.assign({}, state, {
        login: true
      })
    default:
      return state
  }
}

export default handlesign
