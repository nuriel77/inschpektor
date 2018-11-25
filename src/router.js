import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';
import About from './components/content/about/About.vue';
import Manage from './components/content/manage/Manage.vue';
import Dashboard from './components/content/dashboard/Dashboard.vue';
import Login from './components/content/Login.vue';
import NodeInfo from './components/content/NodeInfo.vue';
import NotFound from './components/NotFound.vue';

Vue.use(Router);

const loginNecessary = (to, from, next) => {
  if (!Store.getters.authenticated && to.path !== '/login') next('/login');
  else next();
};

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      beforeEnter: loginNecessary
    },
    {
      path: '/node',
      name: 'node-info',
      component: NodeInfo,
      beforeEnter: loginNecessary
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

export default router;