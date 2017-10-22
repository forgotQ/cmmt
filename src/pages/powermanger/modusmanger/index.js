/**
 * Created by ningsong on 17/8/1.
 */
const modusmanger = resolve => require(['./modusmanger'], resolve)
const addmodus = resolve => require(['./addmodus'], resolve)
const editmodus = resolve => require(['./editmodus'], resolve)

export default {
  modusmanger,
  addmodus,
  editmodus
}
