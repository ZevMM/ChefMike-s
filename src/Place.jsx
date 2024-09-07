import Category from "./Category"
import { useState, useEffect } from "react"
import { db } from "./firebase"
import { collection, addDoc } from "firebase/firestore";
import { getFirestore, doc, getDoc } from "firebase/firestore";


function Place({uid}) {
    const [open, setOpen] = useState({hot:false, cold:false, vhot:false, vcold:false})
    const [data, setData] = useState()
    const [sammiches, setSammiches] = useState([
        {name: "Meebball", odds:100, wager:0, payout:0},
        {name: "Chimken", odds:100, wager:0, payout:0},
        {name: "Gramndma Spetchal", odds:100, wager:0, payout:0},
        {name: "Rozt bif", odds:100, wager:0, payout:0}
    ])
    const [csammiches, setCsammiches] = useState([
        {name: "Meebball", odds:100, wager:0, payout:0},
        {name: "Chimken", odds:100, wager:0, payout:0},
        {name: "Gramndma Spetchal", odds:100, wager:0, payout:0},
        {name: "Rozt bif", odds:100, wager:0, payout:0}
    ])
    const [vsammiches, setVsammiches] = useState([
        {name: "Meebball", odds:100, wager:0, payout:0},
        {name: "Chimken", odds:100, wager:0, payout:0},
        {name: "Gramndma Spetchal", odds:100, wager:0, payout:0},
        {name: "Rozt bif", odds:100, wager:0, payout:0}
    ])
    const [cvsammiches, setCvsammiches] = useState([
        {name: "Meebball", odds:100, wager:0, payout:0},
        {name: "Chimken", odds:100, wager:0, payout:0},
        {name: "Gramndma Spetchal", odds:100, wager:0, payout:0},
        {name: "Rozt bif", odds:100, wager:0, payout:0}
    ])

    useEffect(() => {
        let copy = structuredClone(sammiches)
        let docRef = doc(db, `users/${uid}/9-7-2024`, "hot")
        getDoc(docRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            for (const key in docSnapshot.data()) {
                copy[key].wager = docSnapshot.data()[key].wager
                copy[key].payout = docSnapshot.data()[key].payout
            }
        }})
        
        docRef = doc(db, `dailyTotals`, '9-7-2024')
        getDoc(docRef).then((docSnapshot) => {
            if (docSnapshot.exists()) {
                let tot = docSnapshot.data().hot.total
                sammiches.forEach((s, i) => {
                    copy[i].odds = docSnapshot.data().hot[i] * 100 / tot
                })
                
                setData(docSnapshot.data())
            }
        })

        setSammiches(copy);
        

        /*
        docRef = doc(db, `users/${uid}/9-7-2024`, "cold")
        getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
            // Document exists
            let copy = structuredClone(csammiches)
            for (const key in docSnapshot.data()) {
                copy[key].wager = docSnapshot.data()[key]
            }
            setCsammiches(copy);
        }})
        docRef = doc(db, `users/${uid}/9-7-2024`, "vhot")
        getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
            // Document exists
            let copy = structuredClone(vsammiches)
            for (const key in docSnapshot.data()) {
                copy[key].wager = docSnapshot.data()[key]
            }
            setVsammiches(copy);
        }})
        docRef = doc(db, `users/${uid}/9-7-2024`, "vcold")
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
                Hot Sammies</div>
            {open.hot ? <Category uid={uid} data={data} cat={"hot"} sammiches={sammiches} setSammiches={setSammiches}/> : null}
            <div onClick={() => {
                let copy = {...open}
                copy.cold = !open.cold
                setOpen(copy)
            }} style={{fontWeight: "bold", background:"rgb(207 226 243)", width:w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Cold Sammies</div>
            {open.cold ? <Category uid={uid} data={data} cat= {"cold"} sammiches={csammiches} setSammiches={setCsammiches}/> : null}
            <div onClick={() => {
                let copy = {...open}
                copy.vhot = !open.vhot
                setOpen(copy)
            }} style={{fontWeight: "bold", background:"rgb(207 226 243)", width:w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Icky Sammies</div>
            {open.vhot ? <Category uid={uid} data={data} cat={"vhot"} sammiches={vsammiches} setSammiches={setVsammiches}/> : null}
            <div onClick={() => {
                let copy = {...open}
                copy.vcold = !open.vcold
                setOpen(copy)
            }} style={{fontWeight: "bold", background:"rgb(207 226 243)", width:w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Cold Icky Sammies</div>
            {open.vcold ? <Category uid={uid} data={data} cat={"vcold"} sammiches={cvsammiches} setSammiches={setCvsammiches}/> : null}
        </>
    )
}

export default Place