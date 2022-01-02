import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCzfO2Xi6ftif4NOctcomDHYACq2Rpt4Qo",
  authDomain: "e-commerce-db-7bdc9.firebaseapp.com",
  projectId: "e-commerce-db-7bdc9",
  storageBucket: "e-commerce-db-7bdc9.appspot.com",
  messagingSenderId: "99948497264",
  appId: "1:99948497264:web:dc70c02ccc78237bb367b5",
  measurementId: "G-7RHG8WEF5R"
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
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
