import * as taskConstants from '../constants/task'

const initialSate = {
  listTask: []
}

const reducer = (state = initialSate, action) => {
  switch (action.type) {
    case taskConstants.FETCH_TASK:
      return {
        ...state,
        listTask: []
      }
    case taskConstants.FETCH_TASK_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        listTask: data
      }
    case taskConstants.FETCH_TASK_FAILED:
      return {
        ...state,
        listTask: []
      }
    default:
      return state;
  }
}

export default reducer
