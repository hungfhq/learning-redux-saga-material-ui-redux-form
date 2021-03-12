import * as taskApis from '../apis/task'
import * as taskConstants from '../constants/task'

export const fetchListTask = (params = {}) => {
  console.log(`params`, params)
  return {
    type: taskConstants.FETCH_TASK,
    payload: {
      params
    }
  }
}

export const fetchListTaskSuccess = data => {
  return {
    type: taskConstants.FETCH_TASK_SUCCESS,
    payload: {
      data
    }
  }
}

export const fetchListTaskFailed = error => {
  return {
    type: taskConstants.FETCH_TASK_FAILED,
    payload: {
      error
    }
  }
}

export const addTask = (title, description) => {
  return {
    type: taskConstants.ADD_TASK,
    payload: {
      title, description
    }
  }
}

export const addTaskSuccess = data => {
  return {
    type: taskConstants.ADD_TASK_SUCCESS,
    payload: {
      data
    }
  }
}

export const addTaskFailed = error => {
  return {
    type: taskConstants.ADD_TASK_FAILED,
    payload: {
      error
    }
  }
}

export const setTaskEditing = task => {
  return {
    type: taskConstants.SET_TASK_EDITING,
    payload: {
      task
    }
  }
}

export const filterTask = keyword => {
  return {
    type: taskConstants.FILTER_TASK,
    payload: {
      keyword
    }
  }
}

export const filterTaskSuccess = data => {
  return {
    type: taskConstants.FILTER_TASK_SUCCESS,
    payload: {
      data
    }
  }
}
