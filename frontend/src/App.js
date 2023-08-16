import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/users/screens/Home';
import ViewProposal from './components/users/ViewProposal';
import EventState from './components/users/context/EventState';



function App() {

  return (
    <EventState>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/userHome' element={<Home />} />
            <Route path='/viewproposal/:id' element={<ViewProposal />} />
          </Routes>
        </div>
      </BrowserRouter>
    </EventState>

  );
}

export default App;
