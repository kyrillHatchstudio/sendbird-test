// This environment object acts the same as the one in environment.ts, except that it sets a
// property that hinders services to load objects from the internet, eg from the stripe-js
// library

export const environment = {
  production: false,
  externalCommunication: false,
  version: 'missing',
  sendbirdAppId: '8D505859-4A9C-4990-A93F-7EF1022B16D7',
  userA: 'pract@solavieve.com',
  userA_AccessToken: 'a3b0f3084fa2ea82d5a47fbba0df74fd59283e39',
  userB: '0f7a4c6d-c9f9-44a5-bf0a-9afb3cbff5d7',
}
  /*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
