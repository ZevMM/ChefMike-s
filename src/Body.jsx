import Place from "./Place"
import { useState } from "react";
import { db } from "./firebase";
import { auth } from "./firebase";


const prettydate = (n) => {
  // Create a new Date object for today's date
  const today = new Date();
  
  // Create a new Date object for the target date
  const targetDate = new Date(today);
  
  // Adjust the target date by adding n days
  targetDate.setDate(today.getDate() + n);

  // Define an array of month abbreviations
  const monthAbbreviations = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const month = monthAbbreviations[targetDate.getMonth()]; // Get month abbreviation
  const day = targetDate.getDate(); // Get numeric day
  const year = targetDate.getFullYear(); // Get full numeric year
  
  // Format the date as "Month day, year"
  return (`${month} ${day}, ${year}`)
}

const goBack = (day, setDay) => {
  setDay(day - 1)
}

const goForward = (day, setDay) => {
  setDay(day + 1)
}

function Body({uid}) {
    const [day, setDay] = useState(1)

    return (
      <div style={{width:"100%", height:"90%", display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h2>
          Predictions for {prettydate(day)}
        </h2>
        <Place uid = {uid}/>
      </div>
    )
  }
  
export default Body
  