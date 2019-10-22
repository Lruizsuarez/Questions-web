// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCkkeYc1IpQlac0g6ecMekhU8WGbXI5Fb8',
    authDomain: 'questions-2a3c5.firebaseapp.com',
    databaseURL: 'https://questions-2a3c5.firebaseio.com',
    projectId: 'questions-2a3c5',
    storageBucket: '',
    messagingSenderId: '411133758726',
    appId: '1:411133758726:web:0385fec422abd4dc'
  }, microsoftConfig: {
    tenant: '299a2881-1380-4020-b42f-715a35e1bcaf',
    client_id: '91882a10-c473-4a6a-a89c-404cf7b6b316',
    userPermissions: [
      'User.Read',
      'email',
      'openid',
      'profile'
    ]
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
