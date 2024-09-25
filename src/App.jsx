import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import Body from './Body'
import {auth} from './firebase'
import { db } from './firebase'
import {Login, Verify} from './Login'
import { onAuthStateChanged, sendEmailVerification  } from 'firebase/auth'
import { rtdb } from './firebase'
import { ref, onValue } from "firebase/database";
import { createContext } from 'react'
import { doc, getDoc } from "firebase/firestore";

export const oddsContext = createContext(null)

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

function App() {
  const [tokens, setTokens] = useState(100)
  const [uid, setUID] = useState('')
  const [emailVer, setEmailVer] = useState(false)
  const [odds, setOdds] = useState({hot: {0:0, 1:0, 2:0, 3:0, total: 0},
    cold: {0:0, 1:0, 2:0, 3:0, total: 0},
    vhot: {0:0, 1:0, 2:0, 3:0, total: 0},
    vcold: {0:0, 1:0, 2:0, 3:0, total: 0},
  })

  const onLogin = async (uid, email) => {
    let query = new URLSearchParams(JSON.stringify({uid: uid, username: email.split('@')[0]})).toString()
    fetch(`https://onlogin-pv6pdk53ha-uc.a.run.app?data=${query.slice(0,-1)}`, {
      method: 'GET',
      mode: 'no-cors',
    }).then(() => {
      let docRef = doc(db, `users/${uid}`)
      getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          setTokens(parseInt(docSnapshot.data().tokens))
      }})
    })
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user && auth?.currentUser?.emailVerified) {
          setUID(user.uid)
          onLogin(user.uid, user.email)
          setEmailVer(auth.currentUser.emailVerified)
        } else if (user) {
          setUID(user.uid)
        } else {
          setUID('')
        }
      });
  }, [])

  useEffect( () => {
  const oddsRef = ref(rtdb, date)
  onValue(oddsRef, (snapshot) => {
    setOdds(snapshot.val())
    console.log("snapshot", snapshot.val())
  })}, [])

  
  
  return (
    <oddsContext.Provider value={odds}>
    <div style={{width:"100%", height:"100%"}}>
      {uid ? ( emailVer ? 
      <><Header tokens={tokens} setTokens= {setTokens} uid={uid}/>
      <Body tokens={tokens} setTokens= {setTokens} uid={uid}/></> : <Verify setEmailVer={setEmailVer}/> ) :
      
      
      <Login />}
    </div>
    </oddsContext.Provider >
  )
}

export default App
