import mikelogo from './assets/mikelogo.png'
import { db } from './firebase'
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { Leaderboard, Help, Settings, Profile } from './Modals';

function Header({uid}) {
    const [tokens, setTokens] = useState(0)
    const [modals, setModals] = useState({leaderboard: false, help: false, settings: false, profile: false})

    //raise this up and pass it down to "Category"
    //makes updating easier + can add warnings if bet is over balance
    useEffect(() => {
        let docRef = doc(db, `users/${uid}`)
        getDoc(docRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setTokens(docSnapshot.data().tokens)
        }})
    })


    return (
        <>
        {modals.leaderboard ? <Leaderboard setModal={setModals}/> : null}
        {modals.help ? <Help setModal={setModals}/> : null}
        {modals.settings ? <Settings setModal={setModals}/> : null}
        

      <div style={{width:"100%", height:"10%", background:"rgb(207 226 243)", display:"flex",
        flexDirection:"row", justifyContent:"space-between", alignItems:"center"
      }}>
        <div style={{ flexGrow:"1", flexBasis:"0"}}>
            <div style={{display:"flex", justifyContent:"center"}}>
            <div style = {{border: "2px solid black", borderRadius: "15px", padding:"5px", display:"flex", flexDirection:"row"}} onClick={() => setModals({...modals, leaderboard: true})}
                onBlur={(e) => {
                    if (e.relatedTarget && e.relatedTarget.className == "modal") {
                        return
                    }
                    setModals({leaderboard: false, help: false, settings: false, profile: false})
                }}
                tabIndex={-1}>
                <div>
                    {tokens} | 12th
                </div>
                <div style={{paddingLeft: "5px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
                    </svg>
                </div>
            </div>
            </div>
        </div>
        {window.screen.width > 600 ? <div style={{height:"100%"}}>
            <img src={mikelogo} alt="Logo" style={{maxHeight:"100%", maxWidth:"100%"}}/>
        </div> : null}
        <div style={{ flexGrow:"1", flexBasis:"0", display:"flex", maxHeight:"100%", flexDirection:"row"}}>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div style={{height:"50%"}} onClick={() => setModals({...modals, help: true})}
                onBlur={(e) => {
                    if (e.relatedTarget && e.relatedTarget.className == "modal") {
                        return
                    }
                    setModals({leaderboard: false, help: false, settings: false, profile: false})
                }}
                tabIndex={-1}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor"  viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                </svg>
            </div>
            <div style={{height:"50%"}} onClick={() => setModals({...modals, settings: true})}
                onBlur={(e) => {
                    if (e.relatedTarget && e.relatedTarget.className == "modal") {
                        return
                    }
                    setModals({leaderboard: false, help: false, settings: false, profile: false})
                }}
                tabIndex={-1}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg>
            </div>


            <div style={{height:"50%"}} onClick={() => setModals({...modals, profile: true})}
                onBlur={(e) => {
                    if (e.relatedTarget && e.relatedTarget.className == "modal") {
                        return
                    }
                    setModals({leaderboard: false, help: false, settings: false, profile: false})
                }}
                tabIndex={-1}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor"  viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            {modals.profile ? <Profile setModal={setModals}/> : null}
            </div>


            </div>
        </div>
      </div>
      </>
    )
  }
  
export default Header
  