import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import Body from './Body'
import {auth} from './firebase'
import Login from './Login'
import { onAuthStateChanged } from 'firebase/auth'
import { rtdb } from './firebase'
import { ref, onValue } from "firebase/database";
import { createContext } from 'react'

export const oddsContext = createContext(null)

function App() {
  const [uid, setUID] = useState('')
  const [odds, setOdds] = useState({hot: {0:1, 1:0, 2:4, 3:1, total: 6},
    cold: {0:1, 1:0, 2:4, 3:1, total: 6},
    vhot: {0:1, 1:0, 2:4, 3:1, total: 6},
    vcold: {0:1, 1:0, 2:4, 3:1, total: 6},
  })

  const onLogin = async (uid) => {
    console.log("running")
    let query = new URLSearchParams(JSON.stringify({uid: uid})).toString()
    fetch(`https://onlogin-pv6pdk53ha-uc.a.run.app?data=${query.slice(0,-1)}`, {
      method: 'GET',
      mode: 'no-cors',
    })
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUID(user.uid)
          onLogin(user.uid)
        } else {
          setUID('')
        }
      });
  }, [])

  useEffect( () => {
  const oddsRef = ref(rtdb, '9-7-2024')
  onValue(oddsRef, (snapshot) => {
    setOdds(snapshot.val())
    console.log("snapshot", snapshot.val())
  })}, [])

  return (
    <oddsContext.Provider value={odds}>
    <div style={{width:"100%", height:"100%"}}>
      {uid ? 
      <><Header uid={uid}/>
      <Body uid={uid}/></> :
      <Login />}
    </div>
    </oddsContext.Provider >
  )
}

export default App
