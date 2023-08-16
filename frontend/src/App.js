
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/users/screens/Home';
import ViewProposal from './components/users/ViewProposal';
import EventState from './components/users/context/EventState';
import VendorSignIn from "./components/vendor/vendor-sign-in";
import CreateVendor from "./components/Proposals/CreateVendor";
import VendorGet from "./components/Proposals/VendorGet";


function App() {
  

  return (
    <EventState>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/userHome' element={<Home />} />
            <Route path='/viewproposal/:id' element={<ViewProposal />} />
            <Route path="/" element={<VendorSignIn />} />
            <Route path="/getproposal" element={<VendorGet />} />
            <Route path="/createproposal" element={<CreateVendor />} />
          </Routes>
        </div>
      </BrowserRouter>
    </EventState>


  );
}

export default App;

