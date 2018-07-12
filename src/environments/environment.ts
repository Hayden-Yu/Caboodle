// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  host: 'http://localhost:6237/',
  
  production: false,
  api: 'http://localhost:4000/api/',
  captchaKey: '6LfldVwUAAAAAItkDn0UjyZihpmWgLwGGMjM_grm',
  email: {
    username: 'caboodle.api@gmail.com',
    password: '%ThUvY1iE$0h'
  },
  mongodb: {
    host: 'myvmlab.senecacollege.ca',
    username: 'caboodle',
    password: 'cX8qzpMsN6rb',
    database: 'caboodle',
    port: 6241
  }  
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
