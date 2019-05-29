
import Home from '@/module/home/page/home.vue';
import course_list from '@/module/course/page/course_list.vue';
export default [
  {
    path: '/course',
    component: Home,
    name: '课程管理',
    hidden: false,
    iconCls: 'el-icon-document',
    children: [
      { path: '/course/list', name: '我的课程',component: course_list,hidden: false }
    ]
  }
]
