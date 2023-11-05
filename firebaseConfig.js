// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHOnQ2W4nfpEZmTn-ioMqRNqOrbRmSYVI",
  authDomain: "streambet-65b8c.firebaseapp.com",
  projectId: "streambet-65b8c",
  storageBucket: "streambet-65b8c.appspot.com",
  messagingSenderId: "522286682364",
  appId: "1:522286682364:web:72a27af6aa1fea04c24779",
  measurementId: "G-W0HY0D6EQN"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export { auth };
