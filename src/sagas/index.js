import { fork, take, call, put, delay, takeLatest, select, takeEvery } from 'redux-saga/effects'
import * as taskTypes from '../constants/task'
import { getList } from '../apis/task'
import { STATUS_CODE } from '../constants'
import {
  fetchListTaskSuccess,
  fetchListTaskFailed,
  filterTaskSuccess
} from '../actions/task'
import { showLoading, hideLoading } from '../actions/ui'
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
    yield delay(1000)
    yield put(hideLoading())
  }
}


function* filterTaskSaga({ payload }) {
  yield delay(500)
  const { keyword } = payload
  const list = yield select(state => state.task.listTask)
  console.log(`object`, list)
  let filteredList = clone(list)
  if (keyword.trim() !== '') {
    filteredList = list.filter(item => item.title.toLowerCase().includes(keyword.trim().toLowerCase()))
  }
  console.table(filteredList);
  yield put(filterTaskSuccess(filteredList))
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction) //non-blocking
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga)
  // yield takeEvery(taskTypes.FILTER_TASK, filterTaskSaga)
}

export default rootSaga
