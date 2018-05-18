import { post } from './ajax'

/**
 *
 * @param {} params
 */
exports.getIndex = function(params = {}) {
  return new Promise(async (resolve, reject) => {
    const data = await post('getIndex', params)
    resolve(data)
  })
}
