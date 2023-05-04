import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCBXpACqu9_uAAN6FEwwNw7hW4ItfuxvLY",
  authDomain: "push-73d4e.firebaseapp.com",
  projectId: "push-73d4e",
  storageBucket: "push-73d4e.appspot.com",
  messagingSenderId: "893383415897",
  appId: "1:893383415897:web:196bb3b43ab6d9cca2f948",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);
