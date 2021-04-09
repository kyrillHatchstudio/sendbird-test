// This environment object acts the same as the one in environment.ts, except that it sets a
// property that hinders services to load objects from the internet, eg from the stripe-js
// library

export const environment = {
  production: false,
  externalCommunication: false,
  version: 'missing',
  sendbirdAppId: 'REPLACE-HERE',
  userA: 'REPLACE-HERE',
  userA_AccessToken: 'REPLACE-HERE',
  userB: 'REPLACE-HERE' // no access token for userB
}
  /*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
