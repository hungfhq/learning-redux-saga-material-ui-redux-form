import { API_ENDPOINT } from '../constants'
import axiosService from './../commons/axiosService'

const url = 'tasks'
const fullUrl = `${API_ENDPOINT}/${url}`

export const getList = () => {
  return axiosService.get(fullUrl)
}

export const addTask = data => {
  return axiosService.post(fullUrl, data)
}
