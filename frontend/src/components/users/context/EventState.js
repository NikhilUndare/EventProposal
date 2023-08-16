import EventContext from "./EventContext"
import { useEffect, useState } from "react";

const EventState = (props) => {
     
    const [select,setSelect] =useState([])
   
    const handleSelect = (proposal) => {
            setSelect(proposal)
    }
    return (
        <EventContext.Provider value={{select,handleSelect}} >
            {props.children}
        </EventContext.Provider>
    )
}

export default EventState