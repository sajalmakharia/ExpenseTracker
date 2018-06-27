// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyB_HsbWqRya4JtHhmXUtd3_S4os3nNFiZg',
    authDomain: 'expensetracker-af48a.firebaseapp.com',
    databaseURL: 'https://expensetracker-af48a.firebaseio.com',
    projectId: 'expensetracker-af48a',
    storageBucket: 'expensetracker-af48a.appspot.com',
    messagingSenderId: '1076962689225'
  },
};
