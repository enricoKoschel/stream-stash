import { boot } from 'quasar/wrappers';
import vue3GoogleLogin from 'vue3-google-login';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  const google = vue3GoogleLogin;

  app.use(google, {
    clientId:
      '100227495150-cnu571i10u1689hgq5t08t4qi5ojrhq1.apps.googleusercontent.com',
  });
});
