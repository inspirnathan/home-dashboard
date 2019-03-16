import firebase from 'firebase';

const config = {
  apiKey: '[FIREBASE_API_KEY]',
  authDomain: '[FIREBASE_PROJECT_NAME].firebaseapp.com',
  databaseURL: 'https://[FIREBASE_PROJECT_NAME].firebaseio.com',
  storageBucket: 'gs://[FIREBASE_PROJECT_NAME].appspot.com'
};

firebase.initializeApp(config);

const db = firebase.database();
export const applicationRef = db.ref('application');