import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'indexPage',
    redirect: { name: 'mainPage', params: { watchState: 'watching' } },
  },
  {
    path: '/:watchState(watching|planning|watched)',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'mainPage',
        component: () => import('pages/MainPage.vue'),
        props: true,
      },
    ],
  },
  {
    //:id(\d+) only matches digits
    path: '/:mediaType(tv|movie)/:id(\\d+)',
    component: () => import('layouts/MediaLayout.vue'),
    children: [
      {
        path: '',
        name: 'mediaPage',
        component: () => import('pages/MaybeMediaPage.vue'),
        props: (route) => {
          return {
            id: Number(route.params.id),
            mediaType: route.params.mediaType,
          };
        },
      },
    ],
  },
  {
    path: '/about',
    name: 'aboutPage',
    component: () => import('pages/AboutPage.vue'),
  },
  {
    path: '/profile',
    name: 'profilePage',
    component: () => import('pages/ProfilePage.vue'),
  },
  {
    path: '/notFound',
    name: 'errorNotFound',
    component: () => import('pages/ErrorNotFound.vue'),
    alias: '/:catchAll(.*)*',
  },
];

export default routes;
