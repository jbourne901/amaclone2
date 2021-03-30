import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBdv_K-S8exf8VjOtr0NOIuyYI81cn49Ro",
    authDomain: "amaclone2.firebaseapp.com",
    projectId: "amaclone2",
    storageBucket: "amaclone2.appspot.com",
    messagingSenderId: "966392899662",
    appId: "1:966392899662:web:63a261e2e09fbdd5dc3b1f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export type ISnapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
export type IDocument = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
export const db = firebase.firestore();

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();




