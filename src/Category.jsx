import { useState } from "react"


/*
<input value={s.wager} onChange={(e)=> {
                            let copy = structuredClone(sammiches)
                            copy[i].wager = e.target.value
                            setSammiches(copy)
                        }}type="number" min={0} />
*/

function Category({uid, data, cat, sammiches, setSammiches}) {
    const [popup, setPopup] = useState(false)
    const [cur, setCur] = useState(0)
    const [wager, setWager] = useState(0)
    const [payout, setPayout] = useState(0)

    const fancyMath = (n) => {
        return (data[cat].total * n / data[cat][cur])
    }

    
    const LockIn = async () => {

        let query = new URLSearchParams(JSON.stringify({uid: uid, cat:cat, cur:cur, wager: parseInt(wager), payout: parseInt(payout)})).toString()
        console.log(query.slice(0,-1))
        fetch(`https://helloworld-pv6pdk53ha-uc.a.run.app?data=${query.slice(0,-1)}`, {
            method: 'GET',
            mode: 'no-cors'
        })
    
    }

    const w = window.screen.width > 500 ? "400px" : "90%"

    return (
        <>
        {popup ? (<div className="popup" style= {{ padding: "10px", display:"flex", flexDirection:"column", position:"absolute", zIndex:"5", width:w, height:"25%", background:"white", borderRadius:"5px", boxShadow:"0 0 5px #888888"}}
            onBlur={(e) => { if (e.relatedTarget && e.relatedTarget.className == "popup") {
                return
            } setPopup(false)}} tabIndex={1}>
                {sammiches[cur].name}
                <input className="popup" type="number" min={0} value={wager} onChange={(e) => {setWager(e.target.value)
                    setPayout(fancyMath(e.target.value))
                }}/>
                <input className="popup" type = "button" value={`Bet to win $${payout.toFixed(2)}`}  style={{marginTop:"20px", fontSize:"15px", background:"black", color:"white", border:"none", borderRadius:"10px", padding:"10px"}}
                onClick={() => LockIn()}/>
                <input className="popup" type = "button" value={`Cancel`}  style={{marginTop:"20px", fontSize:"15px", border:"1px solid black", color:"black", border:"none", borderRadius:"10px", padding:"10px"}}
                onClick={() => setPopup(false)}/>
            </div>) : null}
        <div style={{maxHeight:"100px", overflowY:"auto"}}>

            <table>
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
                        <td> {s.odds.toFixed(2)}% </td>
                        <td> {s.wager} </td>
                        <td> {s.payout} </td>
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