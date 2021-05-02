import firebaseCred from './FirebaseCred.js';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp(firebaseCred);
const firestore = firebase.firestore(firebaseApp);

export { firebase, firebaseApp, firestore };