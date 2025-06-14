// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATsfyDYPY_MysglEdTANY4t50dxIqkPjo",
  authDomain: "areal-30dd7.firebaseapp.com",
  projectId: "areal-30dd7",
  storageBucket: "areal-30dd7.firebasestorage.app",
  messagingSenderId: "269618805813",
  appId: "1:269618805813:web:efae6b8a176cdc779b057c",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
