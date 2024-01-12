import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'indexPage',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    // TODO: Have 2 routes /tv and /movie
    //:id(\d+) only matches digits
    path: '/media/:id(\\d+)',
    component: () => import('layouts/MediaLayout.vue'),
    children: [
      {
        path: '',
        name: 'mediaPage',
        component: () => import('pages/MediaPage.vue'),
        props: (route) => {
          return {
            id: Number(route.params.id),
          };
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
