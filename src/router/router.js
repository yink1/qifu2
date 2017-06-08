import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import login from '@/views/login'
import register from '@/views/register'
import docList from '@/views/docList'
import companyList from '@/views/companyList'
import companyDetail from '@/views/companyDetail'
import serviceDetail from '@/views/serviceDetail'
import docDetail from '@/views/docDetail'
import memberCenter from '@/views/memberCenter'
import requetHistoryList from '@/components/memberCenter/requetHistoryList'
import history from '@/components/memberCenter/history'
import serviceHistoryList from '@/components/memberCenter/serviceHistoryList'
import memberCenterComp from '@/components/memberCenter/memberCenter'
import recharge from '@/components/memberCenter/recharge'
import pointHistory from '@/components/memberCenter/pointHistory'
import docHistoryList from '@/components/memberCenter/docHistoryList'
import memberFavorites from '@/components/memberCenter/memberFavorites'
import favoriteCompanyList from '@/components/memberCenter/favoriteCompanyList'
import favoriteServiceList from '@/components/memberCenter/favoriteServiceList'
import favoriteDocList from '@/components/memberCenter/favoriteDocList'
import memberDoc from '@/components/memberCenter/memberDoc'
import docUploadList from '@/components/memberCenter/docUploadList'
import docDownloadList from '@/components/memberCenter/docDownloadList'
import service from '@/views/service'
import companyCenter from '@/views/companyCenter'
import homepageManagment from '@/components/companyCenter/homepageManagment'
import serviceManagment from '@/components/companyCenter/serviceManagment'
import requirementList from '@/components/companyCenter/requirementList'
import uploadServiceList from '@/components/companyCenter/uploadServiceList'
import uploadDocList from '@/components/companyCenter/uploadDocList'
import companyCenterComp from '@/components/companyCenter/companyCenter'
import companyInfo from '@/components/companyCenter/companyInfo'
import docUploadManagment from '@/views/docUploadManagment'
import upload from '@/views/MultiUpload'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/docList',
      name: 'docList',
      component: docList
    },
    {
      path: '/companyList',
      name: 'companyList',
      component: companyList
    },
    {
      path: '/companyDetail',
      name: 'companyDetail',
      component: companyDetail
    },
    {
      path: '/docDetail',
      name: 'docDetail',
      component: docDetail
    },
    {
      path: '/service',
      name: 'service',
      component: service
    },
    {
      path: '/serviceDetail',
      name: 'serviceDetail',
      component: serviceDetail
    },
    {
      path: '/docUploadManagment',
      name: 'docUploadManagment',
      component: docUploadManagment
    },
    {
      path: '/companyCenter',
      name: 'companyCenter',
      component: companyCenter,
      children: [
        {
          path: 'homepageManagment',
          component: homepageManagment,
          meta: { requiresCompRole: true }
        },
        {
          path: 'serviceManagment',
          component: serviceManagment,
          meta: { requiresCompRole: true }
        },
        {
          path: 'companyInfo',
          component: companyInfo,
          meta: { requiresCompRole: true }
        },
        {
          path: 'companyCenter',
          component: companyCenterComp,
          children: [
            {
              path: 'requirementList',
              component: requirementList,
              meta: { requiresCompRole: true }
            },
            {
              path: 'uploadServiceList',
              component: uploadServiceList,
              meta: { requiresCompRole: true }
            },
            {
              path: 'uploadDocList',
              component: uploadDocList
            }
          ]
        }
      ]
    },
    {
      path: '/memberCenter',
      name: 'memberCenter',
      component: memberCenter,
      children: [
        {
          path: 'history',
          component: history,
          name: 'history',
          children: [
            {
              path: '/',
              component: requetHistoryList
            },
            {
              path: 'requetHistoryList',
              component: requetHistoryList
            },
            {
              path: 'serviceHistoryList',
              component: serviceHistoryList
            },
            {
              path: 'docHistoryList',
              component: docHistoryList
            }
          ]
        },
        {
          path: 'memberCenter',
          component: memberCenterComp,
          children: [
            {
              path: 'recharge',
              component: recharge
            },
            {
              path: 'pointHistory',
              component: pointHistory
            }
          ]
        },
        {
          path: 'memberFavorites',
          component: memberFavorites,
          children: [
            {
              path: 'favoriteCompanyList',
              component: favoriteCompanyList,
              meta: { requiresAuth: true }
            },
            {
              path: 'favoriteServiceList',
              component: favoriteServiceList,
              meta: { requiresAuth: true }
            },
            {
              path: 'favoriteDocList',
              component: favoriteDocList,
              meta: { requiresAuth: true }
            }
          ]
        },
        {
          path: 'memberDoc',
          component: memberDoc,
          children: [
            {
              path: 'docUploadList',
              component: docUploadList,
              meta: { requiresAuth: true }
            },
            {
              path: 'docDownloadList',
              component: docDownloadList,
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    }
  ]
})

export default router

