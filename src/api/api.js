import axios from './axiosConfig'
export function axiosPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        console.log('response.data')
        console.log(response.data)
        return resolve(response.data)
      }, err => {
        console.log('err')
        console.log(err)
        reject(err)
      })
      .catch((error) => {
        console.log('error')
        console.log(error)
        reject(error)
      })
  })
}

export function axiosGet (url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        console.log('response.data')
        console.log(response.data)
        return resolve(response.data)
      }, err => {
        console.log('err')
        console.log(err)
        alert(err.response.data.Message)
        // reject(err)
      })
      .catch((error) => {
        console.log('error')
        console.log(error)
        // reject(error)
      })
  })
}
