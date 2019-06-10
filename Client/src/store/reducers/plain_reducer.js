import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
  stateprop1: false,
}

export const Reducer1 = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.SUCCESS:
        return {
          ...state,
          stateprop1: true,
        }
      case ACTION_TYPES.FAILURE:
        return {
          ...state,
          stateprop1: false,
        }
      default:
        throw new Error();
    }
}
