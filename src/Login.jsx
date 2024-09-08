import {useState} from 'react';
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword , sendEmailVerification, signOut  } from 'firebase/auth';
import {auth} from './firebase';


const handleLogin = (auth, email, password, setErr) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
        setErr(error.message)
    })
}

const handleSignup = async (auth, email, password, setErr) => {
    if (!(email.split('@')[1] == "columbia.edu" || email.split('@')[1] == "barnard.edu" )) {
        setErr("Must use a Columbia/Barnard email")
        return
    }
    await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
        setErr(error.message)
    })
}
const w = window.screen.width > 500 ? "60%" : "90%"
const bw = window.screen.width > 500 ? "25%" : "60%"
const bw2 = window.screen.width > 500 ? "20%" : "50%"
export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    return (
        <div style={{background: "rgb(207 226 243)", width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            
            <h1 style={{width:w, textAlign:"center", marginBottom:"0"}}>Will you be the ultimate sandwich predictor?</h1>
            <h1 style={{width:w, textAlign:"center", marginBottom:"40px"}}>Prove your skills. Attain everlasting glory.</h1>
            
            <input value={email} style={{width: bw, margin: "10px", border:"1px solid rgb(222, 226, 230)", borderRadius:"5px", padding:"7px", fontFamily:"Segoe UI"}} onChange={(e) => setEmail(e.target.value)} placeholder="Columbia/Barnard Email"/>
            <input value={password} style={{width: bw, margin: "10px", border:"1px solid rgb(222, 226, 230)", borderRadius:"5px", padding:"7px", fontFamily:"Segoe UI"}} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            {err? err:null}
            <input type="button" value="Log in" style={{width: bw2, margin: "10px", border:"1px solid grey", borderRadius:"5px", padding:"7px", backgroundColor:"black", color:"white", fontFamily:"Segoe UI"}} onClick={() => handleLogin(auth, email, password, setErr)}/>
            <input type="button" value="Sign up" style={{width: bw2, border:"1px solid grey", borderRadius:"5px", padding:"7px", backgroundColor:"black", color:"white", fontFamily:"Segoe UI"}} onClick={() => handleSignup(auth, email, password, setErr)}/>
        </div>
    )
}

export function Verify({setEmailVer}) {

    sendEmailVerification(auth.currentUser)

    return (
        <div style={{background: "rgb(207 226 243)", width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            
            <h3 style={{width:w, textAlign:"center", marginBottom:"0"}}>You have been emailed a verification link. Please click it to activate your account. </h3>
            <h3 style={{width:w, textAlign:"center", fontSize:"25pt"}}><b> You must refresh the page after clicking the link </b></h3>
            <input type="button" value="Resend email" style={{width: bw2, margin: "10px", border:"1px solid grey", borderRadius:"5px", padding:"7px", backgroundColor:"black", color:"white", fontFamily:"Segoe UI"}} onClick={() => sendEmailVerification(auth.currentUser)}/>
            <input type="button" value="Use a different account" style={{width: bw2, margin: "10px", border:"1px solid grey", borderRadius:"5px", padding:"7px", backgroundColor:"black", color:"white", fontFamily:"Segoe UI"}} onClick={() => signOut(auth)}/>
        </div>
    )
}