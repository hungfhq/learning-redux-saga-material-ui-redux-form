import { fork, take, call, put, delay } from 'redux-saga/effects'
import * as taskTypes from '../constants/task'
import { getList } from '../apis/task'
import { STATUS_CODE } from '../constants'
import { fetchListTaskSuccess, fetchListTaskFailed } from '../actions/task'
import { showLoading, hideLoading } from '../actions/ui'

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
    yield delay(2000)
    yield put(hideLoading())
  }
}

function* watchCreateTaskAction() {
  yield true
  console.log(`watchCreateTaskAction`)
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction) //non-blocking
  yield fork(watchCreateTaskAction)
}

export default rootSaga
