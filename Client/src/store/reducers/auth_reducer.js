import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
  is_authenticated: false,
  db_profile: null,
    profile: null,
}

export const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.LOGIN_SUCCESS:
        return {
          ...state,
          is_authenticated: true
        }
      case ACTION_TYPES.LOGIN_FAILURE:
        return {
          ...state,
          is_authenticated: false
        }
        case ACTION_TYPES.ADD_PROFILE:
          return {
            ...state,
            profile: action.payload
          }
        case ACTION_TYPES.REMOVE_PROFILE:
          return {
            ...state,
            profile: null
          }
        case ACTION_TYPES.SET_DB_PROFILE:
          return {
            ...state,
            db_profile: action.payload
          }
        case ACTION_TYPES.REMOVE_DB_PROFILE:
          return {
            ...state,
            db_profile: null
          }
      default:
        return state
    }
}
