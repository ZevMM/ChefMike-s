
//import {onDocumentCreated} from "firebase-functions/v2/firestore";
// The Firebase Admin SDK to access Firestore.
import {initializeApp} from "firebase-admin/app";

import {onRequest} from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";
import {getFirestore} from "firebase-admin/firestore";
import { getDatabase } from "firebase-admin/database";

initializeApp();
/*
export const score = onRequest(async (request, response) => {
    //function to assign points
})*/



export const placeBet = onRequest(async (request, response) => {
    logger.info("Hello logs!", {structuredData: true});
    console.log(request.query)
    let data = JSON.parse(request.query.data)
    console.log(data)


    let update = {[data.cur] : {payout : data.payout, wager: data.wager}}

    console.log(update)

    const userRef = getFirestore().collection('users').doc(data.uid).collection('9-7-2024').doc(data.cat)
    console.log(data.cat)
    let doc = await userRef.get()

    if (!doc.exists) {
        userRef.set({0 : {payout: 0, wager: 0}, 1: {payout: 0, wager: 0}, 2: {payout: 0, wager: 0}, 3: {payout: 0, wager: 0}})
    }
    await userRef.update(update);

    const db = getDatabase();
    const upvotesRef = db.ref(`9-7-2024/${data.cat}/${data.cur}`);
    upvotesRef.transaction((current_value) => {
    return (current_value || 0) + 1;
    });

    const totRef = db.ref(`9-7-2024/${data.cat}/total`);
    totRef.transaction((current_value) => {
    return (current_value || 0) + 1;
    });

    response.send("done!");
});


export const onLogin = onRequest(async (request, response) => {
    console.log(request.query.data)
    let data = JSON.parse(request.query.data)
    const userRef = getFirestore().collection('users').doc(data.uid)
    let doc = userRef.get()
    
    if (doc.exists) {
        response.send("please don't try to break my app")
        return
    }
    userRef.set({tokens:100})
    response.send("done!");
})