import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询课程列表
//我的课程列表
export const findCourseList = (page,size,params) => {
//使用工具类将json对象转成key/value
  let queries = querystring.stringify(params)
  return http.requestQuickGet(apiUrl+"/course/coursebase/list/"+page+"/"+size+"?"+queries)
}

//查询课程分类
export const category_findlist= () => {
  return http.requestQuickGet(apiUrl+'/category/list')
}
/*添加课程基础信息*/
export const addCourseBase = params => {
  return http.requestPost(apiUrl+'/course/coursebase/add',params)
}
/*查询课程计划*/
export const findTeachplanList = courseid => {
  return http.requestQuickGet(apiUrl+'/course/teachplan/list/'+courseid)
}
/*添加课程计划*/
export const addTeachplan = teachplah => {
  return http.requestPost(apiUrl+'/course/teachplan/add',teachplah)
}
