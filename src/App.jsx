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
  const oddsRef = ref(rtdb, date)
  onValue(oddsRef, (snapshot) => {
    setOdds(snapshot.val())
    console.log("snapshot", snapshot.val())
  })}, [])

  const [tokens, setTokens] = useState(0)

  return (
    <oddsContext.Provider value={odds}>
    <div style={{width:"100%", height:"100%"}}>
      {uid ? 
      <><Header tokens={tokens} setTokens= {setTokens} uid={uid}/>
      <Body tokens={tokens} setTokens= {setTokens} uid={uid}/></> :
      <Login />}
    </div>
    </oddsContext.Provider >
  )
}

export default App
