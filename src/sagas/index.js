import { fork, take, call, put } from 'redux-saga/effects'
import * as taskTypes from '../constants/task'
import { getList } from '../apis/task'
import { STATUS_CODE } from '../constants'
import { fetchListTaskSuccess, fetchListTaskFailed } from '../actions/task'

function* watchFetchListTaskAction() {
  while (true) {
    yield take(taskTypes.FETCH_TASK)
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
