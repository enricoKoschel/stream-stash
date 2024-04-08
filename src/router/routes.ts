import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { MediaType } from 'src/models/types';
import { capitalizeFirstLetter } from 'src/models/methods';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'indexPage',
    redirect: { name: 'overviewPage', params: { watchState: 'watching' } },
  },
  {
    path: '/:watchState(watching|planning|watched)',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: (route: RouteLocationNormalized) =>
        capitalizeFirstLetter(route.params.watchState as string),
    },
    children: [
      {
        path: '',
        name: 'overviewPage',
        component: () => import('pages/OverviewPage.vue'),
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
        meta: {
          title: (route: RouteLocationNormalized) => {
            // TODO: Show media title instead of type and id
            const id = route.params.id as string;

            if (route.params.mediaType === 'tv') {
              return `TV ${id}`;
            } else {
              return `Movie ${id}`;
            }
          },
        },
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
    meta: {
      title: 'About',
    },
    component: () => import('pages/AboutPage.vue'),
  },
  {
    path: '/profile',
    name: 'profilePage',
    meta: {
      title: 'Profile',
    },
    component: () => import('pages/ProfilePage.vue'),
  },
  {
    path: '/loginRedirect',
    name: 'loginRedirectPage',
    meta: {
      title: 'Login',
    },
    component: () => import('pages/LoginRedirectPage.vue'),
  },
  {
    path: '/notFound',
    name: 'errorNotFound',
    meta: {
      title: 'Not Found',
    },
    component: () => import('pages/ErrorNotFound.vue'),
    alias: '/:catchAll(.*)*',
  },
];

export default routes;
