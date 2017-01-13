import Vue from 'vue'
import Vonic from 'vonic'
require('./framework/scrollIntoView.polyfill').polyfill(1000);

// Page Components
import Index from './components/Index.vue'
import About from './components/About.vue'
import Jiemu from './components/Jiemu.vue'
import Result from './components/Result.vue'
import Visual from './components/Visual.vue'

// Routes
const routes = {
  '/': {
    component: Index
  },

  '/about': {
    component: About
  },

  '/jiemu': {
    component: Jiemu
  },

  '/result': {
    component: Result
  },

}

Vue.use(Vonic.app, {routes: routes, defaultRouteUrl: '/'})

