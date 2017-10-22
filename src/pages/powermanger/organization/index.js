/**
 * Created by ningsong on 17/8/11.
 */
const organization = resolve => require(['./organization'], resolve)
const addOrganiza = resolve => require(['./addOrganiza'], resolve)
const editOrganiza = resolve => require(['./editOrganiza'], resolve)

export default {
  organization,
  addOrganiza,
  editOrganiza
}
