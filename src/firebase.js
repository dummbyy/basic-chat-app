import firebase from 'firebase';

const firebaseConfig = {
    /*
    
    FIRE BASE CONFIGS
    
    */
};

const fireBaseApp = firebase.initializeApp(firebaseConfig);
const db = fireBaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
