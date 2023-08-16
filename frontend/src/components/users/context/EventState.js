import EventContext from "./EventContext"
import {  useState } from "react";

const EventState = (props) => {
     
    const [select,setSelect] =useState([])
    let [apiType, setApitype] = useState({ id: "", type: "" });
    function Updation(update) {
      setApitype(update);
    }
    const handleSelect = (proposal) => {
            setSelect(proposal)
    }
    return (
        <EventContext.Provider value={{select,handleSelect,apiType,Updation}} >
            {props.children}
        </EventContext.Provider>
    )
}

export default EventState