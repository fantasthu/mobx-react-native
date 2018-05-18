import Frisbee from 'frisbee'
const api = new Frisbee({
  baseURI:
    'https://easy-mock.com/mock/5a01289d7481a94dbc06c287/example_1504846259835_1510024770722_1510025373307/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
exports.post = function(url, params) {
  return new Promise(async (resolve, reject) => {
    const _ = await api.post(url, params)
    if (_.body) {
      resolve(_.body)
    }
    if (_.err) {
      resolve({
        message: '网络请求异常',
        status: -1,
        error: _.err
      })
    }
  })
}
