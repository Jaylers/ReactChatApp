import getFirebaseClient from './getClient'

const onAuthStateChanged = () =>
    new Promise((resolve) => {
        const { firebase } = getFirebaseClient();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user)
            } else {
                resolve(null)
            }
        })
    });

export default onAuthStateChanged