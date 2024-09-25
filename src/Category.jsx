import { useState } from "react"
import { useContext } from "react"
import { oddsContext } from "./App"


/*
<input value={s.wager} onChange={(e)=> {
                            let copy = structuredClone(sammiches)
                            copy[i].wager = e.target.value
                            setSammiches(copy)
                        }}type="number" min={0} />
*/

function Category({uid, cat, sammiches, setSammiches, tokens, setTokens}) {
    const [popup, setPopup] = useState(false)
    const [cur, setCur] = useState(0)
    const [wager, setWager] = useState(0)
    const [payout, setPayout] = useState(0)
    const data = useContext(oddsContext)

    const fancyMath = (x) => {
        let b = Math.log(x + data[cat][cur])
        let a = Math.log(data[cat][cur])
        return ((data[cat].total - data[cat][cur]) * (b - a)) + x
    }

    
    const LockIn = async () => {
        if (wager == "") {setPopup(false); return}
        let query = new URLSearchParams(JSON.stringify({uid: uid, cat:cat, cur:cur, wager: wager, payout: payout})).toString()
        console.log(query.slice(0,-1))
        fetch(`https://placebet-pv6pdk53ha-uc.a.run.app?data=${query.slice(0,-1)}`, {
            method: 'GET',
            mode: 'no-cors'
        })
        let copy = structuredClone(sammiches)
        copy[cur].wager += parseInt(wager)
        copy[cur].payout += payout
        setWager(0)
        setPayout(0)
        setSammiches(copy)
        setPopup(false)
        setTokens(tokens - wager)
    
    }

    const w = window.screen.width > 500 ? "400px" : "90%"
    return (
        <>
        {popup ? (<div className="popup" style= {{ padding: "10px", display:"flex", flexDirection:"column", position:"absolute", zIndex:"5", width:w, height:"25%", background:"white", borderRadius:"5px", boxShadow:"0 0 5px #888888"}}
            onBlur={(e) => { if (e.relatedTarget && e.relatedTarget.className == "popup") {
                return
            } setPopup(false)}} tabIndex={1}>
                {sammiches[cur].name}
                <input className="popup" type="number" min={0} max={tokens} value={wager} onChange={(e) => {
                    if (e.target.value == "" || e.target.value == "-") {setWager(""); setPayout(0); return}
                    let v = parseInt(e.target.value)
                    if (v <= tokens) {setWager(v); setPayout(fancyMath(v))}
                }}/>
                <input className="popup" type = "button" value={`Bet to win ${payout.toFixed(2)}🪙`}  style={{marginTop:"20px", fontSize:"15px", background:"black", color:"white", border:"none", borderRadius:"10px", padding:"10px"}}
                onClick={() => LockIn()}/>
                <input className="popup" type = "button" value={`Cancel`}  style={{marginTop:"20px", fontSize:"15px", color:"black", border:"none", borderRadius:"10px", padding:"10px"}}
                onClick={() => setPopup(false)}/>
            </div>) : null}
        <div style={{maxHeight:"250px", overflowY:"auto", width:w}}>

            <table style={{width: "100%"}}>
                <thead>
                <tr>
                    <th>Sandwich</th>
                    <th>Odds</th>
                    <th>Wager</th>
                    <th>Payout</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {sammiches.map((s, i) => {
                    return (
                        <tr>
                        <td> {s.name} </td>
                        <td> {(data[cat][i] * 100 / data[cat].total).toFixed(2)}% </td>
                        <td style={{textAlign:"center"}}> {s.wager} </td>
                        <td style={{textAlign:"center"}}> {Math.round(s.payout)} </td>
                        <td> <input type="button" onClick={() => {setPopup(true)
                            setCur(i)
                        }} value={"+"} onBlur={
                            (e) => {
                                if (e.relatedTarget && e.relatedTarget.className == "popup") {
                                return
                            } setPopup(false)}
                        }
                        style={{background:"lightgreen", border:"none", borderRadius:"4px"}}
                        /> </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>

        </div>
        </>
    )
}

export default Category