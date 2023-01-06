import { firebaseApp } from './firebase-app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  query,
  getDocs,
  collection,
  writeBatch,
} from 'firebase/firestore';

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

export const signOutUser = async () => await signOut(auth);

export const authStateChangeListener = async (callback) =>
  onAuthStateChanged(auth, callback);

// DB Operations
// Storing docs in collection
export const addCollectionAndDocuments = async (
  collectionKey,
  documentsToAdd
) => {
  // create a Ref with collectionKey in db
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  for (let i = 0; i < documentsToAdd.length; i++) {
    const document = documentsToAdd[i];
    const documentRef = doc(collectionRef, document.title);
    batch.set(documentRef, document);
  }

  await batch.commit();
  console.log('Products added\n');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const queryObject = query(collectionRef);

  const querySnapshot = await getDocs(queryObject);
  return querySnapshot.docs.reduce((result, doc) => {
    const { title, items } = doc.data();
    result[title.toLowerCase()] = items;
    return result;
  }, {});
};
