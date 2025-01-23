import { DiaryEntry } from "../types";




const Entry = ( entry: DiaryEntry) => {

    return (
     <div>
           <h3>{entry.date}</h3>
           <div>visibility:{entry.visibility}</div>
           <div>weather:{entry.weather}</div>
     </div>

    )

}

export default Entry