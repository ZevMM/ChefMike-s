import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getDatabase} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyAeminA-Zh7gkfITn9EFzIwiGXusRBIHKQ",
    authDomain: "chef-mike-s-sportsbook-6a39a.firebaseapp.com",
    projectId: "chef-mike-s-sportsbook-6a39a",
    databaseURL: "https://chef-mike-s-sportsbook-6a39a-default-rtdb.firebaseio.com",
    storageBucket: "chef-mike-s-sportsbook-6a39a.appspot.com",
    messagingSenderId: "924051932698",
    appId: "1:924051932698:web:8cd7df72d3a852633773a3",
    measurementId: "G-G1C2E69VQQ"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
