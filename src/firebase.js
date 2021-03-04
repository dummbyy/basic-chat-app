import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBIi8JPPjQgOll0q1Ur9F_bDgQff3YEW_I",
    authDomain: "slack-clone-test-d9ba6.firebaseapp.com",
    projectId: "slack-clone-test-d9ba6",
    storageBucket: "slack-clone-test-d9ba6.appspot.com",
    messagingSenderId: "36903566306",
    appId: "1:36903566306:web:e80c07481f8b1adfc497bb",
    measurementId: "G-89D64DDXZV"
};

const fireBaseApp = firebase.initializeApp(firebaseConfig);
const db = fireBaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };