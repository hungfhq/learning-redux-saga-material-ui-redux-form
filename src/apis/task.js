import { API_ENDPOINT } from '../constants'
import axiosService from './../commons/axiosService'
import qs from 'query-string'

const url = 'tasks'
const fullUrl = `${API_ENDPOINT}/${url}`

export const getList = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = qs.stringify(params)
  }
  return axiosService.get(`${fullUrl}?${queryParams}`)
}

export const addTask = data => {
  return axiosService.post(fullUrl, data)
}
