import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TollLogin({ setSelectedToll, setSignInButton }) {
  setSignInButton(true);
  const [toll, setToll] = useState('');
  const [pwd, setPwd] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    return () => {
      if (displayMessage) {
        setDisplayMessage(false);
      }
    };
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
    } else {
      pwdInput.type = "password";
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    async function postData(formData) {
      try {
        const response = await axios.post(`http://${window.location.hostname}:4000/login`, formData, { withCredentials: true });
        console.log(response);
        if (response.data === "Success") {
          setSelectedToll(toll);
          navigate('/toll/start');
        }
        else {
          setDisplayMessage("Invalid Password");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    if (!toll && !pwd) {
      setDisplayMessage("Please select a toll plaza and enter password");
    }
    else if (!toll) {
      setDisplayMessage("Please select a toll plaza");
    }
    else if (!pwd) {
      setDisplayMessage("Please enter password");
    }
    else {
      const formData = new FormData();
      formData.append('toll', toll);
      formData.append('password', pwd);
      postData(formData);
    }


  };

  return (
    <div className='container ms-3'>
      <h1 className='col-12 mt-5'>Tires On Highways</h1>
      <form className="col-12 col-md-6">
        <div className='row'>
          <select className="form-select mt-3  w-50" aria-label="Default select example" autoComplete="off" onChange={handleTollChange} required>
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
        <label htmlFor="pwd" style={{ textAlign: "center" }}>
          Password:
        </label>
        <br />
        <div className='mt-2 mb-2'>
          <input type="password" id="pwd" className="btn btn-secondary opacity-100" placeholder="Enter Password" required value={pwd} style={{ color: 'black', background: 'white' }} onChange={handlePwdChange} /><span> <input type="checkbox" className="btn btn-primary" id='showPassword' onClick={togglePasswordVisibility} /> Show Password </span>
        </div>
        <div className="row ">
          {displayMessage && <p style={{ color: displayMessage.includes("Invalid") ? "red" : "blue" }}>{displayMessage}</p>}
        </div>
        <div className="input-group mt-1 row">
          <div className="left col-sm-3">
            <Link to="/" >
              <button type="button" className="btn btn-danger mt-1 ">
                Back
              </button>
            </Link>
          </div>
          <div className="right col-sm-3">
            {/* <button type="button" id="LoginSubmit" onClick={handleSubmit} className="btn btn-success mt-0 ">
                Submit
              </button> */}
            <input type="submit" value="Submit" className='btn  btn-success mt-1' onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
}