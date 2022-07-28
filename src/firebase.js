import axios from 'axios';

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  connectFirestoreEmulator,
  addDoc,
  doc
} from "firebase/firestore";

import {
  getAuth,
  sendSignInLinkToEmail,
  connectAuthEmulator,
  onAuthStateChanged,
  signOut,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithCustomToken
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz6p51d0QiKHC6i7yZcH8Rb3uI9mrBb6o",
  authDomain: "tripl-367f7.firebaseapp.com",
  databaseURL: "https://tripl-367f7-default-rtdb.firebaseio.com",
  projectId: "tripl-367f7",
  storageBucket: "tripl-367f7.appspot.com",
  messagingSenderId: "684434788527",
  appId: "1:684434788527:web:6631ee30dcdedde1b5445a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export const host = process.env.SITE_URL;

if (host == "http://localhost:9000") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8090);
}


function loginWithToken(id) {
  console.log("logging in with token", id);

  API_URL = "http://localhost:5001/tripl-367f7/us-central1"
  axios.post(API_URL + "/userToken", {id})
  .then(({data: {customToken}}) => {
    console.log({customToken})
    signInWithCustomToken(auth, customToken)
    .then(user => console.log("user!", user))
    .catch(error => {
      const { code: errorCode, message: errorMessage } = error
        console.log("error!", { errorCode, errorMessage })
        console.log(errorCode)
        console.log(errorMessage)
    })
  })
}

function withUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, userData => {
      if (userData) {
        // const uid = user.uid;
        console.log("We got a user!", userData);
        setUser(userData);
      } else {
        console.log("We're userless")
        setUser(false);
      }
    });

    return unsub;
  }, [])

  return user;
}


export { loginWithToken, withUser };
