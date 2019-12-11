import * as firebase from 'firebase';

let initFirebase;
const firebaseConfig = {
  apiKey: "AIzaSyD-CTTeR8a5vACJ4rrw8LkYQ87a3jIvGE4",
  authDomain: "reactchatapp-2d509.firebaseio.com",
  databaseURL: "https://reactchatapp-2d509.firebaseio.com",
  storageBucket: "reactchatapp-2d509.appspot.com"
};

const getClient = () => {
  if (!initFirebase) {
    initFirebase = firebase.initializeApp(firebaseConfig);
  }
  return { initFirebase, firebase }
};

export default getClient