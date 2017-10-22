import fetch from 'common/fetch'
//搜索
export function search(url,data) {
  return fetch({
    url: url,
    method: 'post',
    params: data
  })
}
