import {useState} from 'react';
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword   } from 'firebase/auth';
import {auth} from './firebase';


const handleLogin = (auth, email, password, setErr) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
        setErr(error.message)
    })
}

const handleSignup = async (auth, email, password, setErr) => {
    
    await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
        setErr(error.message)
    })
}
const w = window.screen.width > 500 ? "60%" : "90%"
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    return (
        <div style={{background: "rgb(207 226 243)", width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            
            <h1 style={{width:w, textAlign:"center"}}>Will you be the ultimate sandwich predictor? Prove your skills. Attain everlasting glory.</h1>
            
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Columbia/Barnard Email"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            {err? err:null}
            <input type="button" value="Login" onClick={() => handleLogin(auth, email, password, setErr)}/>
            <input type="button" value="Sign Up" onClick={() => handleSignup(auth, email, password, setErr)}/>
        
        </div>
    )
}

export default Login