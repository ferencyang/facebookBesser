import Vue from 'vue'
import Router from 'vue-router'

import Launch from '@/components/common/Launch'
import Nav from '@/components/common/Nav'
import Login from '@/components/common/Login'
import Register from '@/components/common/Register'
import ForgetPW from '@/components/common/ForgetPW'
import LockPage from '@/components/common/LockPage'

import ShowNetWrong from '@/components/pages/ShowNetWrong'
import ShowLogo from '@/components/pages/ShowLogo'
import ShowNotPage from '@/components/pages/ShowNotPage'

import PostNew from '@/components/pages/PostNew'
import AddFriend from '@/components/pages/AddFriend'
import ReplyCom from '@/components/pages/ReplyCom'
import Robot from '@/components/pages/Robot'
import TaskShow from '@/components/pages/TaskShow'
import Analysis from '@/components/pages/Analysis'
import Settings from '@/components/pages/Settings'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/postnew',
      name: 'Nav',
      component: Nav,
      children: [
          {
            path: '/postnew',
            name: 'PostNew',
            component: PostNew
          },{
            path: '/addfriend',
            name: 'AddFriend',
            component: AddFriend
          },{
            path: '/reply',
            name: 'ReplyCom',
            component: ReplyCom
          },{
            path: '/robot',
            name: 'Robot',
            component: Robot
          },{
            path: '/task',
            name: 'TaskShow',
            component: TaskShow
          },{
            path: '/analysis',
            name: 'Analysis',
            component: Analysis
          },{
            path: '/settings',
            name: 'Settings',
            component: Settings
          },{
            path: '/404',
            name: 'ShowNotPage',
            component: ShowNotPage
          },{
            path: '/home',
            name: 'ShowLogo',
            component: ShowLogo
          }
      ]
    },{
      path: '/500',
      name: 'ShowNetWrong',
      component: ShowNetWrong
    },{
      path: '/lockpage',
      name: 'LockPage',
      component: LockPage
    },{
      path: '/Register',
      name: 'Register',
      component: Register
    },{
      path: '/ForgetPW',
      name: 'ForgetPW',
      component: ForgetPW
    }
  ]
});
