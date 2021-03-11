import { fork, take, call, put, delay, takeLatest, select, takeEvery } from 'redux-saga/effects'
import * as taskTypes from '../constants/task'
import { getList, addTask } from '../apis/task'
import { STATUSES, STATUS_CODE, TIMER } from '../constants'
import {
  fetchListTaskSuccess,
  fetchListTaskFailed,
  filterTaskSuccess,
  addTaskSuccess,
  addTaskFailed
} from '../actions/task'
import { showLoading, hideLoading } from '../actions/ui'
import { hideModal } from '../actions/modal'
import { clone } from 'lodash'


function* watchFetchListTaskAction() {
  while (true) {
    yield take(taskTypes.FETCH_TASK)
    yield put(showLoading())
    // from here, code will be blocked
    const resp = yield call(getList)
    const { status, data } = resp
    if (status === STATUS_CODE.SUCCESS) {
      // dispatch action fetchListTaskSuccess
      yield put(fetchListTaskSuccess(data))
    } else {
      // dispatch action fetchListTaskFailed
      yield put(fetchListTaskFailed(data))
    }
    yield delay(TIMER.loadingTime)
    yield put(hideLoading())
  }
}


function* filterTaskSaga({ payload }) {
  yield delay(500)
  const { keyword } = payload
  const list = yield select(state => state.task.listTask)
  let filteredList = clone(list)
  if (keyword.trim() !== '') {
    filteredList = list.filter(item => item.title.toLowerCase().includes(keyword.trim().toLowerCase()))
  }
  yield put(filterTaskSuccess(filteredList))
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload
  yield put(showLoading())
  const resp = yield call(addTask, {
    title, description, status: STATUSES[0].value
  })
  const { data, status } = resp;
  console.log(`add task success`, resp)
  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data))
  } else {
    yield put(addTaskFailed(data))
  }
  yield delay(TIMER.loadingTime)
  yield put(hideModal())
  yield put(hideLoading())
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction) //non-blocking
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga)
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga)
}

export default rootSaga
