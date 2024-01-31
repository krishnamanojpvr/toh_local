import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

export default function CheckRecords(props) {
  props.setSignInButton(false);
  const [dateSub, setDateSub] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [tireStatus, setTireStatus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState(null);
  const [loader, setLoader] = useState(false);
  const [resp, setResp] = useState([]);
  const navigate = useNavigate();
  const [thead , setThead] = useState(false)
  const date = new Date();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  if (m < 10) m = '0' + m;
  if (d < 10) d = '0' + d;

  const dateS = date.getFullYear() + '-' + m + '-' + String(d);

  async function checkDate(e) {
    setThead(false)
    setRecords(null)
    setLoader(true);
    e.preventDefault();
    try {
      const response = await axios.get(`http://${window.location.hostname}:4000/checkRecords`, {
        params: {
          date: dateSub,
          tollPlaza: props.selectedToll,
        },
        withCredentials: true,
      });
      setResp(response.data);
      setLoader(false);
      response.data.length===0?setThead(false):setThead(true);
      setRecords(`${response.data.length}`);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDateChange = (e) => {
    setLoader(false);
    setDateSub(e.target.value);
  }

  const handleImageClick = () => {
    setShowModal(true);
  }

  async function getImage(vehicleNumber) {
    try {
      const imageSrcData = await axios.get(`http://${window.location.hostname}:4000/getIm`, {
        params: {
          date: dateSub,
          tollPlaza: props.selectedToll,
          vehicleNumber: vehicleNumber,
        },
        withCredentials: true,
      });
      for (let i = 0; i < imageSrcData.data[0].length; i++) {
        imageSrcData.data[0][i] = "data:image/jpeg;base64," + imageSrcData.data[0][i];
      }
      const b64Array = imageSrcData.data[0]; // this is an array containing base64 strings of images
      const statusArray = imageSrcData.data[1];  // this is an array containing classification results
      setSelectedImage(b64Array);
      setTireStatus(statusArray);
      handleImageClick();
    }
    catch (err) {
      console.log(err);
    }
  }

  const goTo = () => {
    navigate('/toll/start');
  }

  return (
    <div className='parenth'>
      <div className='container text-center'>
      <h1 style={{color:'white',backdropFilter:'blur(8px)'}} className='mt-5 bg-black border border-white border-3 rounded-5 p-4' >Toll Check Records : {props.selectedToll}</h1>
        <form onSubmit={checkDate} style={{backdropFilter:'blur(10px)'}} className='container mb-4 bg-black border border-white border-3 rounded-5 p-2   justify-content-center' >
          <label htmlFor='date'className="mt-1 mb-2 container  align-items-center"style={{color:'white',}}>Enter date :</label>
          <input type='date' name='date' className='me-3 ms-3 rounded-3 border border-3 border-white' onChange={handleDateChange} max={dateS} required></input>
          {!loader && <input type='submit' className='btn btn-primary me-1' value='Check' />}
          <input type='button' className='btn btn-warning ms-2' onClick={goTo} value='Go Back' />
          {loader && <Loader />}
        {records && !loader &&
        <div id='p' className='mt-3 mb-3'>

          {records==='0'? <button type='button' className='btn btn-danger'>No Records</button>:<button type='button' className='btn btn-success'>Total Records : {records}</button>}
        </div>
        }
        </form>
      </div>

      <div className=' table-responsive'>
        {
          thead &&
          <table className="table table-light table-bordered border border-black border-5 container text-center">
            <thead  >
              <tr >
                <th scope="col">Vehicle Number</th>
                <th scope="col">Mobile Number</th>
                <th scope="col" style={{ width: 'auto' }}>Image</th>
              </tr>
            </thead>
            <tbody >
              {resp.map((item, index) => (
                <tr key={index}>
                  <td>{item.vehicleNumber}</td>
                  <td>{item.userMobileNumber}</td>
                  <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal" onClick={() => getImage(item.vehicleNumber)}>
                    Image(s)
                  </button>
                    {
                      <div className="modal fade " id="Modal" tabindex="-1">
                        <div className="modal-dialog modal-dialog-scrollable">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">Image Tire</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              {showModal &&
                                tireStatus.map((item, index) => (<div className='row text-center mt-3 '>
                                  <div id="getImg" >
                                    <img className="enlarge" style={{ width: '200px', height: 'auto', borderRadius: '10px', transition: 'width 0.3s ease' }} // Shrink on mouse out
                                      src={selectedImage[index]} alt="Vehicle Tire" />
                                  </div>
                                  <p >Classification : {item.class} </p>
                                  <p >Confidence : {item.confidence} </p>
                                  <hr/>
                                  <br/>
                                </div>))}
                              {
                                !showModal &&
                                <Loader />
                              }
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}