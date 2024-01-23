import React from 'react';
import NoAccess from './Components/NoAccess';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TollStart from './Components/TollStart';
import TollUpload from './Components/TollUpload';
import Home from './Components/Home';
import Guest from './Components/Guest'
import GuestUpload from './Components/GuestUpload';
import GuestDetails from './Components/GuestDetails';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import TollLogin from "./Components/TollLogin";
// import Footer from './Components/Footer';
import './all_css/Home.css';
import './all_css/TollLogin.css';
import './all_css/TollStart.css';
import './all_css/TollUpload.css';
import './all_css/Guest.css';
import './all_css/GuestDetails.css';
import './all_css/GuestUpload.css';
import './all_css/Loader.css';
import Loader from './Components/Loader';
import CheckRecords from './Components/CheckRecords';
import './stylesheet.css';
import './street_cred-webfont.woff';
import './street_cred-webfont.woff2';

const NotFound = (props) => (
  // props.setSignInButton(true);
  <h1>404 Error.
    The page you are looking for does not exist
  </h1>)

function App() {
  const [selectedToll, setSelectedToll] = useState('');
  const [signInButton, setSignInButton] = useState(true);
  const [cookie, setCookie] = useState(document.cookie);

  // document.cookie = "tollLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


  useEffect(() => {
    const storedToll = localStorage.getItem('selectedToll');
    if (storedToll) {
      setSelectedToll(storedToll);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedToll', selectedToll);
  }, [selectedToll]);

  return (
    <>
      <Router>
        <Navbar signInButton={signInButton} setCookie={setCookie} />
        <Routes>
          <Route path='/' element={<Home setSignInButton={setSignInButton}  />} />
          <Route path='/loader' element={<Loader />} />
          <Route path='/aboutus' element={<AboutUs setSignInButton={setSignInButton} />} />
          <Route path='/toll' element={<TollLogin setCookie={setCookie} selectedToll={selectedToll} setSelectedToll={setSelectedToll} setSignInButton={setSignInButton}  />} />
          {!cookie &&
            (<>
              <Route path='/toll/start' element={<NoAccess />} />
              <Route path='/toll/upload' element={<NoAccess />} />
              <Route path='/toll/checkrecords' element={<NoAccess />} />
            </>
            )
          }

          {cookie &&
            (<>
              <Route path='/toll/start' element={<TollStart selectedToll={selectedToll} setSignInButton={setSignInButton} />} />
              <Route path='/toll/upload' element={<TollUpload selectedToll={selectedToll} setSignInButton={setSignInButton} />} />
              <Route path='/toll/checkrecords' element={<CheckRecords selectedToll={selectedToll} setSignInButton={setSignInButton} />} />
            </>
            )
          }


          <Route path='/guest' element={<Guest setSignInButton={setSignInButton} />} />
          <Route path='/guest/upload' element={<GuestUpload setSignInButton={setSignInButton} />} />
          <Route path='/guest/checkdetails' element={<GuestDetails setSignInButton={setSignInButton} />} />
          <Route path='*' element={<NotFound setSignInButton={setSignInButton}  />} />
        </Routes>
        {/* <Footer setSignInButton={setSignInButton}/> */}
      </Router>
    </>
  );
}

export default App;