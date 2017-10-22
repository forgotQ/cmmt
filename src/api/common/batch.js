import fetch from 'common/fetch'
//搜索
export function batch(url,data) {
  return fetch({
    url: url,
    method: 'post',
    data
  })
}
