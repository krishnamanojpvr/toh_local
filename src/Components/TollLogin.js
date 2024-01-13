import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TollLogin({ setSelectedToll, setSignInButton }) {
  setSignInButton(true);
  const [toll, setToll] = useState('');
  const [pwd, setPwd] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    if (displayMessage) {
      const timeoutId = setTimeout(() => {
        setDisplayMessage(false);
      }, 2000);

      return () => clearTimeout(timeoutId); // This will clear the timeout if the component unmounts or if uploadStatus changes before the timeout completes
    }
  }, [displayMessage]);

  const handleTollChange = (event) => {
    setDisplayMessage('');
    setToll(event.target.value);
    setSelectedToll(event.target.value);
  };

  const handlePwdChange = (event) => {
    setDisplayMessage('');
    setPwd(event.target.value);
  };

  const togglePasswordVisibility = () => {
    const pwdInput = document.getElementById("pwd");
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      document.getElementById("showPassword").innerHTML = "Hide Password";
    } else {
      pwdInput.type = "password";
      document.getElementById("showPassword").innerHTML = "Show Password";
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    async function postData(formData){
      try{
        const response = await axios.post(`http://${window.location.hostname}:4000/login`,formData,{ withCredentials: true });
        console.log(response);
        if (response.data === "Success"){
          setSelectedToll(toll);
          navigate('/toll/start');
        }
        else{
          setDisplayMessage("Invalid Password");
        }
      }
      catch(err){
        console.log(err);
      }
    }
    if(!toll && !pwd){
      setDisplayMessage("Please select a toll plaza and enter password");
    }
    else if(!toll){
      setDisplayMessage("Please select a toll plaza");
    }
    else if(!pwd){
      setDisplayMessage("Please enter password");
    }
    else{
      const formData = new FormData();
      formData.append('toll',toll);
      formData.append('password',pwd);
      postData(formData);
    }

    
  };

  return (
    <div className='container'>
      <div className='row'>
        <h1 className='col-12 mt-5'>Tires On Highways</h1>
        <select className="form-select mt-3 w-50" aria-label="Default select example" autoComplete="off" onChange={handleTollChange} required>
          <option value="" >Select Toll Plaza</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Pune">Pune</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Surat">Surat</option>
        </select>
      </div>
      <div className='row mt-4'>
        <form className="col-12 col-md-6">
          <label htmlFor="pwd" style={{ textAlign: "center" }}>
            Password:
          </label>
          <br />
          <div className='mt-2'>
            <input type="password" id="pwd" className="btn btn-secondary opacity-100" placeholder="Enter Password" required value={pwd} style={{ color: 'black', background: 'white' }} onChange={handlePwdChange} />
          </div>
          <br></br>
          <div className="input-group mt-3">
            <button type="button" className="btn btn-primary" id='showPassword' onClick={togglePasswordVisibility}>Show Password</button>
            <Link to="/toll/start">
              <button type="button" id="LoginSubmit" onClick={handleSubmit} className="btn btn-success ms-3">
                Submit
              </button>
            </Link>
          </div>
        </form>
        <div className='row'>
          <div className='col-12 mt-4'>
            {displayMessage && <p style={{ color: displayMessage.includes("Invalid") ? "red" : "blue" }}>{displayMessage}</p>}
          <div className='mt-4'>
            <Link to="/" >
              <button type="button" className="btn btn-danger">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}