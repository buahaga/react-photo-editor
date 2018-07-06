import * as firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAU_m46cJTLSKO39zhid-XBLkkmqDE2wqI',
  authDomain: 'react-photo-editor.firebaseapp.com',
  databaseURL: 'https://react-photo-editor.firebaseio.com',
  projectId: 'react-photo-editor',
  storageBucket: 'gs://react-photo-editor.appspot.com',
  messagingSenderId: '1064815589619'
};

export const fireBase = firebase.initializeApp(firebaseConfig);
