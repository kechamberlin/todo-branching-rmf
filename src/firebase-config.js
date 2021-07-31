import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDvcUJvQGLXlmMBBdUJMs81osj-4Xo-XrY',
  authDomain: 'todo-branching-rmf.firebaseapp.com',
  projectId: 'todo-branching-rmf',
  storageBucket: 'todo-branching-rmf.appspot.com',
  messagingSenderId: '486278026991',
  appId: '1:486278026991:web:ae1c650f29d5dd5b52ed1a',
  measurementId: 'G-V6TTC4NGTB',
});

const db = firebaseApp.firestore();
export default db;
