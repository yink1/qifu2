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
import companyRegisterStep1 from '@/views/companyRegisterStep1'
import companyRegisterStep2 from '@/views/companyRegisterStep2'
import companyRegisterStep3 from '@/views/companyRegisterStep3'
import docManagment from '@/components/companyCenter/docUploadManagment'
import memberDocUpload from '@/components/memberCenter/memberDocUpload'
import store from '@/store/store'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
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
      path: '/docList/:docName?/:refresh?',
      name: 'docList',
      component: docList
    },
    {
      path: '/companyRegisterStep1',
      name: 'companyRegisterStep1',
      component: companyRegisterStep1,
      meta: { requiresAuth: true }
    },
    {
      path: '/companyRegisterStep2',
      name: 'companyRegisterStep2',
      component: companyRegisterStep2,
      meta: { requiresAuth: true }
    },
    {
      path: '/companyRegisterStep3',
      name: 'companyRegisterStep3',
      component: companyRegisterStep3,
      meta: { requiresAuth: true }
    },
    {
      path: '/companyList',
      name: 'companyList',
      component: companyList
    },
    {
      path: '/companyDetail/:companyId',
      name: 'companyDetail',
      component: companyDetail
    },
    {
      path: '/docDetail/:docId',
      name: 'docDetail',
      component: docDetail
    },
    {
      path: '/service/:labelId?/:childLabelId?/:serviceName?/:refresh?',
      name: 'service',
      component: service
    },
    {
      path: '/serviceDetail/:id',
      name: 'serviceDetail',
      component: serviceDetail
    },
    {
      path: '/docUploadManagment/:id?',
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
          path: 'serviceManagment/:id?',
          component: serviceManagment,
          name: 'serviceManagment',
          meta: { requiresCompRole: true }
        },
        {
          path: 'companyInfo',
          component: companyInfo,
          meta: { requiresCompRole: true }
        },
        {
          path: 'docManagment/:docId?',
          name: 'docManagment',
          component: docManagment,
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
              component: uploadDocList,
              meta: { requiresCompRole: true }
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
          children: [
            {
              path: '/',
              component: requetHistoryList,
              meta: { requiresAuth: true }
            },
            {
              path: 'requetHistoryList',
              component: requetHistoryList,
              meta: { requiresAuth: true }
            },
            {
              path: 'serviceHistoryList',
              component: serviceHistoryList,
              meta: { requiresAuth: true }
            },
            {
              path: 'docHistoryList',
              component: docHistoryList,
              meta: { requiresAuth: true }
            }
          ]
        },
        {
          path: 'memberDocUpload/:docId?',
          name: 'memberDocUpload',
          component: memberDocUpload,
          meta: { requiresAuth: true }
        },
        {
          path: 'memberCenter',
          component: memberCenterComp,
          children: [
            {
              path: 'recharge',
              component: recharge,
              meta: { requiresAuth: true }
            },
            {
              path: 'pointHistory',
              component: pointHistory,
              meta: { requiresAuth: true }
            }
          ]
        },
        {
          path: 'memberFavorites',
          component: memberFavorites,
          children: [
            {
              path: '/',
              component: favoriteCompanyList,
              meta: { requiresAuth: true }
            },
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
              path: '/',
              component: docUploadList,
              meta: { requiresAuth: true }
            },
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
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.getUserLogin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresCompRole)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.getUserLogin || !store.getters.isCompanyUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router

