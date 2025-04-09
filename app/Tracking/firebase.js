import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxONvcaGcMbBvY-RrVcXW8fzX30DqU4jI",
    authDomain: "india-post-cfab4.firebaseapp.com",
    databaseURL: "https://india-post-cfab4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "india-post-cfab4",
    storageBucket: "india-post-cfab4.firebasestorage.app",
    messagingSenderId: "867503451116",
    appId: "1:867503451116:web:f079c45d0670aee672eec9"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);