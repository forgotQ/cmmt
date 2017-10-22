/**
 * Created by ningsong on 17/7/8.
 */
import fetch from 'common/fetch'

export function submit(params) {
  return fetch({
    url: '/apidev/sys/banner/save',
    method: 'post',
    params
  })
}
