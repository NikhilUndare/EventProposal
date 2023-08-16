import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import VendorSignIn from './components/vendor/vendor-sign-in';
import CreateVendor from './components/Proposals/CreateVendor';
import VendorGet from './components/Proposals/VendorGet';
import { createContext, useState } from 'react';

let apiContext=createContext();

function App() {
  let [apiType,setApitype]=useState({id:"",type:''});
  function Updation(update)
  {
      setApitype(update)
  }
  return <>
    <apiContext.Provider value={{apiType,Updation}}>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<VendorSignIn/>}/>
    <Route path='/getproposal' element={<VendorGet/>}/>
    <Route path='/createproposal' element={<CreateVendor/>}/>
  </Routes>
  </BrowserRouter>
    </apiContext.Provider>
  </>
}

export default App;
export {apiContext};
