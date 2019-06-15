import firebase from 'firebase';
import 'firebase/auth';

const {auth} = firebase;
const provider = new firebase.auth.GoogleAuthProvider();

const signInWithEmail = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
}

const signInWithGoogle = () => {
  return auth().signInWithPopup(provider);
}

const signUpWithEmail = (email: string, password: string) => {
  return auth().createUserWithEmailAndPassword(email, password);
}

const signUpWithGoogle = () => {
  return auth().signInWithPopup(provider);
}

const signOut = () => {
  return auth().signOut()
}


const sendPasswordResetEmail = (email) => {
  return auth().sendPasswordResetEmail(email)
}
export {auth, signInWithEmail, signInWithGoogle, signUpWithEmail, signUpWithGoogle, signOut, sendPasswordResetEmail}