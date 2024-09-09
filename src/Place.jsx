import Category from "./Category"
import { useState, useEffect } from "react"
import { db } from "./firebase"
import { collection, addDoc } from "firebase/firestore";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

function Place({uid, tokens, setTokens}) {
    const [open, setOpen] = useState({hot:false, cold:false, vhot:false, vcold:false})
    const [sammiches, setSammiches] = useState([
        {name: "Meatball", wager:0, payout:0},
        {name: "Chicken", wager:0, payout:0},
        {name: "Grandma Special", wager:0, payout:0},
        {name: "Roast beef", wager:0, payout:0}
    ])
    const [csammiches, setCsammiches] = useState([
        {name: "Meatball", wager:0, payout:0},
        {name: "Chicken", wager:0, payout:0},
        {name: "Grandma Special", wager:0, payout:0},
        {name: "Roast beef", wager:0, payout:0}
    ])
    const [vsammiches, setVsammiches] = useState([
        {name: "Meatball", wager:0, payout:0},
        {name: "Chicken", wager:0, payout:0},
        {name: "Grandma Special", wager:0, payout:0},
        {name: "Roast beef", wager:0, payout:0}
    ])
    const [cvsammiches, setCvsammiches] = useState([
        {name: "Meatball", wager:0, payout:0},
        {name: "Chicken", wager:0, payout:0},
        {name: "Grandma Special", wager:0, payout:0},
        {name: "Roast beef", wager:0, payout:0}
    ])

    useEffect(() => {
        
        let docRef = doc(db, `users/${uid}/${date}`, "hot")
        getDoc(docRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            let copy = structuredClone(sammiches)
            for (const key in docSnapshot.data()) {
                copy[key].wager = docSnapshot.data()[key].wager
                copy[key].payout = docSnapshot.data()[key].payout
            }
            setSammiches(copy);
        }})

        docRef = doc(db, `users/${uid}/${date}`, "cold")
        getDoc(docRef).then((docSnapshot) => {
            let copy = structuredClone(csammiches)
            if (docSnapshot.exists()) {
            for (const key in docSnapshot.data()) {
                copy[key].wager = docSnapshot.data()[key].wager
                copy[key].payout = docSnapshot.data()[key].payout
            }
            setCsammiches(copy);
        }})

    
        
        docRef = doc(db, `users/${uid}/${date}`, "vhot")
        getDoc(docRef).then((docSnapshot) => {
            let copy = structuredClone(vsammiches)
            if (docSnapshot.exists()) {
            for (const key in docSnapshot.data()) {
                copy[key].wager = docSnapshot.data()[key].wager
                copy[key].payout = docSnapshot.data()[key].payout
            }
            setVsammiches(copy);
        }})

        

        
        docRef = doc(db, `users/${uid}/${date}`, "vcold")
        getDoc(docRef).then((docSnapshot) => {
            let copy = structuredClone(cvsammiches)
            if (docSnapshot.exists()) {
            for (const key in docSnapshot.data()) {
                copy[key].wager = docSnapshot.data()[key].wager
                copy[key].payout = docSnapshot.data()[key].payout
            }
            setCvsammiches(copy);
        }})

        
        

        /*
        docRef = doc(db, `users/${uid}/${date}`, "cold")
        getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
            // Document exists
            let copy = structuredClone(csammiches)
            for (const key in docSnapshot.data()) {
                copy[key].wager = docSnapshot.data()[key]
            }
            setCsammiches(copy);
        }})
        docRef = doc(db, `users/${uid}/${date}`, "vhot")
        getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
            // Document exists
            let copy = structuredClone(vsammiches)
            for (const key in docSnapshot.data()) {
                copy[key].wager = docSnapshot.data()[key]
            }
            setVsammiches(copy);
        }})
        docRef = doc(db, `users/${uid}/${date}`, "vcold")
        getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
            // Document exists
            let copy = structuredClone(cvsammiches)
            for (const key in docSnapshot.data()) {
                copy[key].wager = docSnapshot.data()[key]
            }
            setCvsammiches(copy);
        }})*/
    
    
    
    }, [])
    const w = window.screen.width > 500 ? "500px" : "100%"
    return (
        <>
            <div onClick={() => {
                let copy = {...open}
                copy.hot = !open.hot
                setOpen(copy)
            }} style={{fontWeight: "bold", background:"rgb(207 226 243)", width: w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Hot</div>
            {open.hot ? <Category tokens={tokens} setTokens={setTokens} uid={uid} cat={"hot"} sammiches={sammiches} setSammiches={setSammiches}/> : null}
            <div onClick={() => {
                let copy = {...open}
                copy.cold = !open.cold
                setOpen(copy)
            }} style={{fontWeight: "bold", background:"rgb(207 226 243)", width:w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Cold</div>
            {open.cold ? <Category tokens={tokens} setTokens={setTokens} uid={uid} cat= {"cold"} sammiches={csammiches} setSammiches={setCsammiches}/> : null}
            <div onClick={() => {
                let copy = {...open}
                copy.vhot = !open.vhot
                setOpen(copy)
            }} style={{fontWeight: "bold", background:"rgb(207 226 243)", width:w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Hot Vegan</div>
            {open.vhot ? <Category tokens={tokens} setTokens={setTokens} uid={uid} cat={"vhot"} sammiches={vsammiches} setSammiches={setVsammiches}/> : null}
            <div onClick={() => {
                let copy = {...open}
                copy.vcold = !open.vcold
                setOpen(copy)
            }} style={{fontWeight: "bold", background:"rgb(207 226 243)", width:w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Cold Vegan</div>
            {open.vcold ? <Category tokens={tokens} setTokens={setTokens} uid={uid} cat={"vcold"} sammiches={cvsammiches} setSammiches={setCvsammiches}/> : null}
        </>
    )
}

export default Place