
import {onRequest} from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";
import admin from "firebase-admin"
//import {onDocumentCreated} from "firebase-functions/v2/firestore";

// The Firebase Admin SDK to access Firestore.
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

initializeApp();
/*
export const score = onRequest(async (request, response) => {
    //function to assign points
})*/

export const helloWorld = onRequest(async (request, response) => {
    logger.info("Hello logs!", {structuredData: true});
    console.log(request.query)
    let data = JSON.parse(request.query.data)
    console.log(data)


    let update = {[data.cur] : {payout : data.payout, wager: data.wager}}

    console.log(update)

    const userRef = getFirestore().collection('users').doc(data.uid).collection('9-7-2024').doc(data.cat)
    await userRef.update(update);

    const totRef = getFirestore().collection('dailyTotals').doc('9-7-2024')
    
    totRef.update({
        [`${data.cat}.${data.cur}`] : admin.firestore.FieldValue.increment(data.wager),
        [`${data.cat}.total`]  : admin.firestore.FieldValue.increment(data.wager)
    })

    response.send("done!");
});
