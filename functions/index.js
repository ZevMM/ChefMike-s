
//import {onDocumentCreated} from "firebase-functions/v2/firestore";
// The Firebase Admin SDK to access Firestore.
import {initializeApp} from "firebase-admin/app";

import {onRequest} from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";
import {getFirestore} from "firebase-admin/firestore";
import { getDatabase } from "firebase-admin/database";

initializeApp();

/*
put correct answer in between spaces
%7B%22hot%22%3A    %2C%22cold%22%3A    %2C%22vhot%22%3A   %2C%22vcold%22%3A   %7D
*/

export const score = onRequest(async (request, response) => {
    let correct = JSON.parse(request.query.data)
    const collectionRef = getFirestore().collection('users')
    const snapshot = await collectionRef.get()

    var currentDate = new Date(
        (new Date()).toLocaleString(
            'en-US',
            { timeZone: 'America/New_York' }
        )
    )
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    const date = `${month}-${day}-${year}`

    snapshot.forEach(async doc => {
        const guessRef = collectionRef.doc(doc.id).collection(date).doc('hot')
        const hot = await guessRef.get()
        collectionRef.doc(doc.id).update({tokens: doc.data().tokens + hot.data()[correct].payout})
    })
    response.send('done')

})



export const placeBet = onRequest(async (request, response) => {
    let data = JSON.parse(request.query.data)

    const tokenRef = getFirestore().collection('users').doc(data.uid)
    let user = await tokenRef.get()
    if (user.data().tokens < data.wager) {
        response.send("insufficient funds")
        return
    }
    tokenRef.update({tokens : user.data().tokens - data.wager})

    var currentDate = new Date(
        (new Date()).toLocaleString(
            'en-US',
            { timeZone: 'America/New_York' }
        )
      )
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    const date = `${month}-${day}-${year}`
    console.log(date)

    const userRef = getFirestore().collection('users').doc(data.uid).collection(date).doc(data.cat)
    console.log(data.cat)
    let doc = await userRef.get()
    let update;
    if (!doc.exists) {
        userRef.set({0 : {payout: 0, wager: 0}, 1: {payout: 0, wager: 0}, 2: {payout: 0, wager: 0}, 3: {payout: 0, wager: 0}})
        update = {[data.cur] : {payout : data.payout, wager: data.wager}}
    } else {
        update = {[data.cur] : {payout : doc.data()[data.cur].payout + data.payout, wager: doc.data()[data.cur].wager + data.wager}}
    }
    await userRef.update(update);

    const db = getDatabase();
    const upvotesRef = db.ref(`${date}/${data.cat}/${data.cur}`);
    upvotesRef.transaction((current_value) => {
    return (current_value || 0) + data.wager;
    });

    const totRef = db.ref(`${date}/${data.cat}/total`);
    totRef.transaction((current_value) => {
    return (current_value || 0) + data.wager;
    });

    response.send("done!");
});


export const onLogin = onRequest(async (request, response) => {
    console.log(request.query.data)
    let data = JSON.parse(request.query.data)
    const userRef = getFirestore().collection('users').doc(data.uid)
    let doc = await userRef.get()
    
    if (doc.exists) {
        response.send("please don't try to break my app")
        return
    }
    userRef.set({tokens:100})
    response.send("done!");
})