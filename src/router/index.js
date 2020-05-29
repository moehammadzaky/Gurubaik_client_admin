import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Dashboard from '@/components/dashboard'
import Topik from '../components/master/topik'
import Mapel from '../components/master/mapel'
import Kompetensi from '../components/master/kompetensi'
import Users from '../components/users/user'
import ActivityGeneral from '../components/activity/create_activity'
import ActivityPembuka  from '../components/activity/activity_pembuka'
import ActivityInti  from '../components/activity/activity_inti'
import ActivityPenutup from '../components/activity/activity_penutup'
import ActivityDetail from '../components/activity/activity_detail'
import LessonPlan from '../components/lesson_plan/lesson'
import LessonPlanDetail from '../components/lesson_plan/detail'
import NewDelivery from '../components/delivery/request'
import StatusDelivery from '../components/delivery/status'
import ActivityEdit from '../components/activity/activity_edit'
import Kurir from '../components/master/kurir'
import Tag from '../components/master/tag'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/master/topik',
      component: Topik
    },
    {
      path: '/master/mapel',
      component: Mapel
    },
    {
      path: '/master/kompetensi',
      component: Kompetensi
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/activity/general',
      component: ActivityGeneral
    },
    {
      path: '/activity/edit/:Id_activity',
      name : 'EditActivity',
      component: ActivityEdit
    },
    {
      path: '/activity/pembuka',
      component: ActivityPembuka
    },
    {
      path: '/activity/inti',
      component: ActivityInti
    },
    {
      path: '/activity/penutup',
      component: ActivityPenutup
    },
    {
      path: '/activity/:Activity_id',
      name : 'Detail',
      component: ActivityDetail
    },
    {
      path: '/lesson',
      component: LessonPlan
    },
    {
      path: '/lesson/detail/:Lesson_id',
      name : 'Lesson',
      component: LessonPlanDetail
    },
    {
      path: '/delivery/new',
      component: NewDelivery
    },
    {
      path: '/delivery/status',
      component: StatusDelivery
    },
    {
      path: '/master/kurir',
      component: Kurir
    },
    {
      path: '/master/tag',
      component: Tag
    }
 ]
})