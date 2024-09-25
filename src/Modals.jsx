import { db } from "./firebase"
import { collection, query, orderBy, startAfter, limit, getDocs, getCountFromServer } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { signOut } from 'firebase/auth'


const w = window.screen.width > 500 ? "400px" : "90%"
export const Leaderboard = ({setModal}) => {
    const [data, setData] = useState(false)
    const [sa, setSA] = useState(null)
    const [page, setPage] = useState(-1)

    useEffect(() => {
        async function fetchLeaders () {
            let arr;
            if (!sa) {
                const userRef = collection(db, 'users')
                const count = await getCountFromServer(userRef)
                arr = Array(Math.floor((count.data().count - 1) / 15))
            } else {
                arr = [...sa]
            }

            let q
            if (page == -1) {
                q = query(collection(db, "users"), orderBy("tokens", "desc"), limit(15) );
            } else {
                q = query(collection(db, "users"), orderBy("tokens", "desc"), startAfter(arr[page]), limit(15) );
            }
            
            let mylist = []
            const querySnapshot = await getDocs(q);
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                mylist.push({name: doc.data().username, tokens: doc.data().tokens});
            });

            setData(mylist)

            if (page < arr.length - 1) {
                arr[page + 1] = lastVisible
            }
            setSA(arr)
        }
        fetchLeaders()
        
    }, [page])

    
    return (
        <div className="modal" style= {{ top: "3%", left:"50%", transform: "translateX(-50%)", WebkitTransform: "translateX(-50%)", padding: "10px", display:"flex", flexDirection:"column", position:"absolute", zIndex:"5", width:w, height:"50%", background:"white", borderRadius:"5px", boxShadow:"0 0 5px #888888", justifyContent:"space-between"}}
        onBlur={(e) => {
            if (e.relatedTarget && e.relatedTarget.className == "modal") {
                return
            }
            setModal({leaderboard: false, help: false, settings: false, profile: false})}}
        tabIndex={-1}>
            <h3>Leaderboard</h3>
            {data ? 
            
            (<div style={{flex:1, overflowY:"auto"}}>
            <table style={{width : "100%"}}>
                <thead>
                <tr>
                    <th style={{textAlign:"left"}}>Position</th>
                    <th style={{textAlign:"left"}}>Name</th>
                    <th style={{textAlign:"left"}}>Tokens</th>
                </tr>
                </thead>
                <tbody>
                {data.map((d, i) => {
                    return (
                        <tr>
                        <td> {i + 1 + (15) * (page + 1)} </td>
                        <td> {d.name} </td>
                        <td> {d.tokens.toFixed(2)} </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>) : null}
            
            <div style={{display:"flex", flexDirection:"row", width: "100%", justifyContent:"space-around"}}>
            <input style={{width: "20%", fontSize:"20pt", borderRadius:"10px", border:"none"}} className="modal" type="button" value="<" onClick={() => {
                if (page > -1) {
                    setPage(page - 1)
                }
                }}
            />
            <input style={{width: "20%", fontSize:"20pt", borderRadius:"10px", border:"none"}} className="modal" type="button" value=">" onClick={() => {
                if (sa && page < sa.length - 1) {
                    setPage(page + 1)}}
                }
            />
            </div>
        </div>
    )
}

export const Help = ({setModal}) => {
    return (
        <div className="modal" style= {{ top: "3%", left:"50%", transform: "translateX(-50%)", WebkitTransform: "translateX(-50%)", padding: "10px", display:"flex", flexDirection:"column", position:"absolute", zIndex:"5", width:w, background:"white", borderRadius:"5px", boxShadow:"0 0 5px #888888"}}
        onBlur={() => setModal({leaderboard: false, help: false, settings: false, profile: false})}
        tabIndex={-1}>
            <h3>How to Play</h3>
            <p>The goal of the game is to earn tokens. Tokens are awarded for correctly predicting which sandwiches will be served tomorrow. </p>
            <p>
                Each day, you can bet on as many sandwiches as you'd like. Sandwiches with lower odds will give higher payouts (though you will only recieve the payout if the guess is correct). </p>
            <p> The odds adjust automatically based on player behavior, so as more people bet on a given sandwich, its odds increase.
            </p>
        </div>
    )
}

export const Profile = ({setModal}) => {
    const pw = window.screen.width > 500 ? "200px" : "40%"
    return (
        <div className="modal" style= {{ top: "9%", transform: "translateX(-80%)", WebkitTransform: "translateX(-80%)", padding: "10px", display:"flex", flexDirection:"column", position:"absolute", zIndex:"5", width:pw,  background:"white", borderRadius:"5px", boxShadow:"0 0 5px #888888", justifyContent:"center"}}
        onBlur={(e) => {
            if (e.relatedTarget && e.relatedTarget.className == "modal") {
                return
            }
            setModal({leaderboard: false, help: false, settings: false, profile: false})}}
        tabIndex={-1}>
            <input className="modal" type="button" style={{borderRadius: "10px", border:"none", padding:"5px"}} value="Sign out" onClick={() => signOut(auth)}/>
            <div style={{fontSize:"small"}}><em>Reach 150 tokens for custom username</em></div>
        </div>
    )
}

export const Settings = ({setModal}) => {
    return (
        <div className="modal" style= {{ top: "3%", left:"50%", transform: "translateX(-50%)", WebkitTransform: "translateX(-50%)", padding: "10px", display:"flex", flexDirection:"column", position:"absolute", zIndex:"5", width:w, height:"25%", background:"white", borderRadius:"5px", boxShadow:"0 0 5px #888888"}}
        onBlur={(e) => {
            if (e.relatedTarget && e.relatedTarget.className == "modal") {
                return
            }
            setModal({leaderboard: false, help: false, settings: false, profile: false})}}
        tabIndex={-1}>
            <h3>Settings</h3>
            <p> There are no settings, I just thought it looked weird with only two buttons. I am sorry if you feel deceived.</p>
        </div>
    )
}