import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import Body from './Body'
import {auth} from './firebase'
import Login from './Login'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const [uid, setUID] = useState('')

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUID(user.uid)
        } else {
          setUID('')
        }
      });
  }, [])

  return (
    <div style={{width:"100%", height:"100%"}}>
      {uid ? 
      <><Header />
      <Body uid={uid}/></> :
      <Login />}
    </div>
  )
}

export default App
