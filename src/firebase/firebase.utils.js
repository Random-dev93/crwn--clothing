import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBAaxbNsf2Je4FKNFjlkToqmkbP2S4LM0Q",
    authDomain: "crwn-clothing-db-1d5f5.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-1d5f5.firebaseio.com",
    projectId: "crwn-clothing-db-1d5f5",
    storageBucket: "crwn-clothing-db-1d5f5.appspot.com",
    messagingSenderId: "927510959593",
    appId: "1:927510959593:web:9d97cc79c2f1c04e1ea778",
    measurementId: "G-7SJ1FXZVDY"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithRedirect(provider);

export default firebase;
