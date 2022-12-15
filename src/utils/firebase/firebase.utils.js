import { firebaseApp } from './firebase-app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';

// Initialize the app

const googleProvider = new GoogleAuthProvider();

// Prompt the user to select some Gmail account
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (user) => {
  // create a reference/path for this document
  const userDocRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    try {
      const { displayName, email } = user;
      console.log('Creating doc\n', displayName, email);
      const createdAt = new Date();
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('Error creating Document', error);
      throw error;
    }
  }
  return userDocRef;
};

export const createUserFromEmailAndPasswordAuth = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
