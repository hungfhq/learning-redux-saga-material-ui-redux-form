import { fork, take, call, put, delay, takeLatest, select, takeEvery } from 'redux-saga/effects'
import * as taskTypes from '../constants/task'
import { getList, addTask } from '../apis/task'
import { STATUSES, STATUS_CODE, TIMER } from '../constants'
import {
  fetchListTaskSuccess,
  fetchListTaskFailed,
  fetchListTask,
  filterTaskSuccess,
  addTaskSuccess,
  addTaskFailed
} from '../actions/task'
import { showLoading, hideLoading } from '../actions/ui'
import { hideModal } from '../actions/modal'


function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskTypes.FETCH_TASK)
    yield put(showLoading())
    const { params } = action.payload
    const resp = yield call(getList, params)
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
  yield delay(TIMER.delayTime)
  const { keyword } = payload
  const q = keyword
  yield put(
    fetchListTask({ q })
  )
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

function* editTaskSaga({ payload }) {
  const { title, description } = payload
  yield put(showLoading())
  console.log(payload)
  yield delay(TIMER.loadingTime)
  yield put(hideLoading())
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction) //non-blocking
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga)
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga)
}

export default rootSaga
