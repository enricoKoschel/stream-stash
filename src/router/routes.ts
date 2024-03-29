import { RouteRecordRaw } from 'vue-router';
import { MediaType } from 'src/models/types';

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
        props: (route): { id: number; mediaType: MediaType } => {
          return {
            id: Number(route.params.id),
            mediaType: route.params.mediaType as MediaType,
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
    path: '/loginRedirect',
    name: 'loginRedirectPage',
    component: () => import('pages/LoginRedirectPage.vue'),
  },
  {
    path: '/notFound',
    name: 'errorNotFound',
    component: () => import('pages/ErrorNotFound.vue'),
    alias: '/:catchAll(.*)*',
  },
];

export default routes;
