// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  auth0: {
    domain: 'dtoolz.eu.auth0.com',
    clientId: 'wDeV68zg6oi0xCYvZFkg0cDjS6EfvtAD',
    callbackURL: 'http://localhost:4200/',
    audience: 'https://dtoolz.eu.auth0.com' //'api.web-mananger.auth.dev'
  },
// Prévoir un service de sicovery
  services: {
    myspace : 'http://localhost:10850',
    users : 'http://localhost:14000'
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
