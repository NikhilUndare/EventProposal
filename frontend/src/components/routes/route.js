import {BrowserRouter,Routes,Route} from "react-router-dom"
import VendorSignIn from "../vendor/vendor-sign-in"

const EventProposal=()=>{
    return(
        <>
        <BrowserRouter>
      <Routes>
          <Route path="/" element={<VendorSignIn/>}/>
      </Routes>
    </BrowserRouter>
        </>
    )
}

export default EventProposal;