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
        { name: "Meatball Hero", wager: 0, payout: 0 },
        { name: "Chef Mike Grandma's Special", wager: 0, payout: 0 },
        { name: "Chicken Parmigiana", wager: 0, payout: 0 },
        { name: "Phili Cheese Steak", wager: 0, payout: 0 },
        { name: "Chicken BLT", wager: 0, payout: 0 },
        { name: "Meatball Parm", wager: 0, payout: 0 },
        { name: "Chopped cheese", wager: 0, payout: 0 },
        { name: "Buffalo chicken and ranch", wager: 0, payout: 0 },
        { name: "Fajita Chicken", wager: 0, payout: 0 },
        { name: "Korean BBQ Pork", wager: 0, payout: 0 },
        { name: "Hot Honey Chicken", wager: 0, payout: 0 },
        { name: "Chicken Tikka Masala", wager: 0, payout: 0 },
        { name: "Chicken Eggplant", wager: 0, payout: 0 },
        { name: "Corned Beef Reuben", wager: 0, payout: 0 },
        { name: "Roast beef onions", wager: 0, payout: 0 },
        { name: "Other", wager: 0, payout: 0 }
    ])
    const [vsammiches, setVsammiches] = useState([
        { name: "Vegan Meatball Hero", wager: 0, payout: 0 },
        { name: "Chef Mike Vegan Grandma's Special", wager: 0, payout: 0 },
        { name: "Vegan Meatball Sub", wager: 0, payout: 0 },
        { name: "Vegan Cheese Steak", wager: 0, payout: 0 },
        { name: "Chipotle Tofu Sub", wager: 0, payout: 0 },
        { name: "Vegan Buffalo Meatball Sub", wager: 0, payout: 0 },
        { name: "Vegan Chopped Cheese", wager: 0, payout: 0 },
        { name: "Buffalo Cauliflower", wager: 0, payout: 0 },
        { name: "Mexicali", wager: 0, payout: 0 },
        { name: "Vegan Korean BBQ", wager: 0, payout: 0 },
        { name: "Quinoa Beans Veggies", wager: 0, payout: 0 },
        { name: "Curry Seitan", wager: 0, payout: 0 },
        { name: "Jackfruit Fajita", wager: 0, payout: 0 },
        { name: "Roasted Eggplant", wager: 0, payout: 0 },
        { name: "Vegan Buffalo Meatball", wager: 0, payout: 0 },
        { name: "Tempeh Reuben", wager: 0, payout: 0 },
        { name: "Tricolor Potato", wager: 0, payout: 0 },
        { name: "Other", wager: 0, payout: 0 }
    ])
    const [csammiches, setCsammiches] = useState([
        { name: "Southwest Chipotle Chicken", wager: 0, payout: 0 },
        { name: "The Fran", wager: 0, payout: 0 },
        { name: "Fresh Mozzarella w/ Pesto", wager: 0, payout: 0 },
        { name: "Fresh Mozzarella and Grilled Veggies", wager: 0, payout: 0 },
        { name: "Italian Hero", wager: 0, payout: 0 },
        { name: "Smoked Turkey and Crispy Bacon Sub", wager: 0, payout: 0 },
        { name: "The Abby Hsu", wager: 0, payout: 0 },
        { name: "Roast Beef", wager: 0, payout: 0 },
        { name: "The Bear", wager: 0, payout: 0 },
        { name: "Turkey BLT", wager: 0, payout: 0 },
        { name: "Curry Tuna Sub", wager: 0, payout: 0 },
        { name: "The Ultimate Fig", wager: 0, payout: 0 },
        { name: "BLT", wager: 0, payout: 0 },
        { name: "Chicken Caesar", wager: 0, payout: 0 },
        { name: "Grilled Chicken Ranch", wager: 0, payout: 0 },
        { name: "Roast Beef and Blue Cheese Crumble", wager: 0, payout: 0 },
        { name: "Chicken w/ Swiss Cheese", wager: 0, payout: 0 },
        { name: "Other", wager: 0, payout: 0 }
    ])
    const [cvsammiches, setCvsammiches] = useState([
        { name: "Southwest Chipotle Tempeh", wager: 0, payout: 0 },
        { name: "Hummus, White Bean, Arugula, Beets", wager: 0, payout: 0 },
        { name: "Miso Marinated Portobello", wager: 0, payout: 0 },
        { name: "Vegan Cheese with Arugula", wager: 0, payout: 0 },
        { name: "Italian Style Tofu", wager: 0, payout: 0 },
        { name: "Cauliflower w/ Mango and Guacamole", wager: 0, payout: 0 },
        { name: "Chickpea Salad Sub", wager: 0, payout: 0 },
        { name: "Portabella Eggplant", wager: 0, payout: 0 },
        { name: "The Sweet Dragon", wager: 0, payout: 0 },
        { name: "The Vegan Bear", wager: 0, payout: 0 },
        { name: "Smokey Seitan, Guacamole, and Tomato", wager: 0, payout: 0 },
        { name: "Curry Seitan", wager: 0, payout: 0 },
        { name: "The Ultimate Fig", wager: 0, payout: 0 },
        { name: "Quinoa, Beans, Roasted Eggplant, w/ Grilled Veggies", wager: 0, payout: 0 },
        { name: "Eggplant Caponata", wager: 0, payout: 0 },
        { name: "Curry Chickpea Salad Hero", wager: 0, payout: 0 },
        { name: "Chinese Garlic Broccoli and Tofu", wager: 0, payout: 0 },
        { name: "Tempeh w/ Grilled Veggies", wager: 0, payout: 0 },
        { name: "Other", wager: 0, payout: 0 }
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
            }} style={{fontWeight: "bold", background:"rgb(207, 226, 243)", width: w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Hot</div>
            {open.hot ? <Category tokens={tokens} setTokens={setTokens} uid={uid} cat={"hot"} sammiches={sammiches} setSammiches={setSammiches}/> : null}
            <div onClick={() => {
                let copy = {...open}
                copy.cold = !open.cold
                setOpen(copy)
            }} style={{fontWeight: "bold", background:"rgb(207, 226, 243)", width:w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Cold</div>
            {open.cold ? <Category tokens={tokens} setTokens={setTokens} uid={uid} cat= {"cold"} sammiches={csammiches} setSammiches={setCsammiches}/> : null}
            <div onClick={() => {
                let copy = {...open}
                copy.vhot = !open.vhot
                setOpen(copy)
            }} style={{fontWeight: "bold", background:"rgb(207, 226, 243)", width:w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Hot Vegan</div>
            {open.vhot ? <Category tokens={tokens} setTokens={setTokens} uid={uid} cat={"vhot"} sammiches={vsammiches} setSammiches={setVsammiches}/> : null}
            <div onClick={() => {
                let copy = {...open}
                copy.vcold = !open.vcold
                setOpen(copy)
            }} style={{fontWeight: "bold", background:"rgb(207, 226, 243)", width:w, textAlign:"center", fontSize:"20px", margin:"4px 0", color:"white"}}>
                Cold Vegan</div>
            {open.vcold ? <Category tokens={tokens} setTokens={setTokens} uid={uid} cat={"vcold"} sammiches={cvsammiches} setSammiches={setCvsammiches}/> : null}
        </>
    )
}

export default Place