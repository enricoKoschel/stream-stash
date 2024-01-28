import { RouteRecordRaw } from 'vue-router';
import { constructMediaKey } from 'src/models/methods';
import { MediaType } from 'src/models/types';
import { useMediaStore } from 'stores/mediaStore';

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
    beforeEnter: async (to, from, next) => {
      const mediaStore = await useMediaStore();

      const key = constructMediaKey(
        to.params.mediaType as MediaType,
        Number(to.params.id)
      );

      if (mediaStore.mediaKeyExists(key)) {
        next();
      } else {
        next({ name: 'errorNotFound' });
      }
    },
    children: [
      {
        path: '',
        name: 'mediaPage',
        component: () => import('pages/MediaPage.vue'),
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
    path: '/:catchAll(.*)*',
    name: 'errorNotFound',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
