import { Plugin } from '@nuxt/types'
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

const accessor: Plugin = ({ error , $axios }) => {

  $axios.onRequest((config: AxiosRequestConfig) => {
    // ...
    return config
  })

  $axios.onError((e: AxiosError<any>) => {
    // ...
  })

  // response interceptor. After the data is returned, you can make a simple judgment here
  $axios.interceptors.response.use((response: AxiosResponse<any>) => {
    const res = response
    if (res.status === 200) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
    (e: any) => {
      const { status, data } = e.response
      error({ statusCode: status, message: data })
      return Promise.reject(e)
    })
}

export default accessor