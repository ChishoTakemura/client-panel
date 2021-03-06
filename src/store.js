import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
// import notifyReducer from "./reducers/notifyReducer";
// import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: 'AIzaSyDIJnLgmb2KpmbcrGk5JJLgb8DjIA4lOR4',
  authDomain: 'reactclientpanel-5036c.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-5036c.firebaseio.com',
  projectId: 'reactclientpanel-5036c',
  storageBucket: 'reactclientpanel-5036c.appspot.com',
  messagingSenderId: '327068311546',
  appId: '1:327068311546:web:5aac8cd98f3a60caef8e43',
  measurementId: 'G-YKC4SZC65N'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "user",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
// the following three lines were needed in the instructor's work to get rid of an error but for my case, I didn't get any error when the following three lines were commented out
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
  // notify: notifyReducer,
  // settings: settingsReducer
});

// Check for settings in localStorage
// if (localStorage.getItem("settings") == null) {
//   // Default settings
//   const defaultSettings = {
//     disableBalanceOnAdd: true,
//     disableBalanceOnEdit: false,
//     allowRegistration: false
//   };

//   // Set to localStorage
//   localStorage.setItem("settings", JSON.stringify(defaultSettings));
// }

// Create initial state
// const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  // initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;