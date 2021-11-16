import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    
    apiKey: "AIzaSyDCshF4qo55XFtu4tb1z_xcqaYOSrEaor4",
    authDomain: "react-d277a.firebaseapp.com",
    databaseURL: "https://react-d277a-default-rtdb.firebaseio.com",
    projectId: "react-d277a",
    storageBucket: "react-d277a.appspot.com",
    messagingSenderId: "164198543537",
    appId: "1:164198543537:web:4b546e474d3e3389a63290",
    measurementId: "G-3B65Z12GT7"
      
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log(error.message);
        }
    }
    return userRef;
};


firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider  = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;