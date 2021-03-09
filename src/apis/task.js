import { API_ENDPOINT } from '../constants'
import axiosService from './../commons/axiosService'

const url = 'tasks'

export const getList = () => {
  return axiosService.get(`${API_ENDPOINT}/${url}`)
}
