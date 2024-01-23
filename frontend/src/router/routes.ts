import { RouteRecordRaw } from 'vue-router';
import { api } from 'boot/axios';

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
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/LoginPage.vue'),
    async beforeEnter() {
      try {
        const response = await api.get('/3/authentication/token/new');
        const data = response.data;

        if (!data['success'] || !data['request_token']) {
          // TODO: Actual error handling
          console.error('Error while acquiring new request token');
          return;
        }

        const token = data['request_token'];

        // TODO: Get full url of login page dynamically from vue router?
        window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:9000/finalize_login`;
      } catch (e) {
        console.error(e);
      }
    },
  },
  {
    path: '/finalize_login',
    name: 'finalLoginPage',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: 'errorNotFound',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
