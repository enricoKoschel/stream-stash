import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { nextTick } from 'vue';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const server = process.env.SERVER as boolean | undefined;
if (server !== undefined && server) {
  throw new Error('Building with SSR requires changing the router boot file');
}

const createHistory =
  process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((to, from) => {
  void nextTick(() => {
    if (typeof to.meta.title === 'function') {
      document.title = to.meta.title(to) as string;
    } else if (typeof to.meta.title === 'string') {
      document.title = to.meta.title;
    } else {
      document.title = 'Stream Stash';
    }
  });
});

export default router;
