import firebase from 'firebase-admin';
import path from 'path';

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    credential: firebase.credential.cert(
      path.resolve(__dirname, '../../serviceAccount.development.json')
    )
  });
}

export default firebase; 