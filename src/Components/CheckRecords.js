import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

export default function CheckRecords(props) {
  props.setSignInButton(false);
  const [dateSub, setDateSub] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [tireStatus, setTireStatus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState(0);
  const [loader, setLoader] = useState(false); // Loader

  const date = new Date();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  if (m < 10) m = '0' + m;
  if (d < 10) d = '0' + d;

  const dateS = date.getFullYear() + '-' + m + '-' + String(d);

  async function checkDate(e) {
    setLoader(true);
    e.preventDefault();
    console.log(props.selectedToll)
    try {
      const response = await axios.get(`http://${window.location.hostname}:4000/checkRecords`, {
        params: {
          date: dateSub,
          tollPlaza: props.selectedToll,
        },
        withCredentials: true,
      });
      let a = response.data;
      setLoader(false);

      const tableRows = a.map((item, index) => (
        <tr key={index}>
          <td>{item.vehicleNumber}</td>
          <td>{item.userMobileNumber}</td>
          {/* <td>{item.tyreStatus[0].class}</td> */}
          {/* <td>{item.tyreStatus[0].confidence}</td> */}
          <td><button className='btn btn-success' onClick={() => getImage(item.vehicleNumber)}>Image(s)</button></td>
        </tr>
      ));
      setTableData(tableRows);
      setRecords(a.length);
      console.log(records);
      document.getElementById('p').innerHTML = "Total Records : " + a.length;
    } catch (err) {
      console.log(err);
      // alert("No Data Found");
    }
  }

  const handleDateChange = (e) => {
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

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage([]);
  }



  return (
    <div>
      <h1>Check Records</h1>
      <div className='container text-center'>
        <div></div>
        <form onSubmit={checkDate}>
          <label htmlFor='date'>Enter date</label>
          <input type='date' name='date' className='me-3' onChange={handleDateChange} max={dateS} required></input>
          {!loader && <input type='submit' className='btn btn-primary' value='Check' />}
          {loader && <Loader/>}
        </form>
        <div id='p' className='mt-3 mb-3'></div>
      </div>

      <div className=' table-responsive'>
        <table className="table table-light table-bordered">
          <thead>
            <tr>
              <th scope="col">Vehicle Number</th>
              <th scope="col">Mobile Number</th>
              <th scope="col" style={{ width: 'auto' }}>Image</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal" style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-dialog" style={{ width: '100%', margin: 'auto' }}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {tireStatus.map((item, index) => (<div className='row text-center mb-4 mt-3'>
                  <div id="getImg" >
                    <img className="enlarge" style={{ width: '200px', height: 'auto', borderRadius: '10px', transition: 'width 0.3s ease' }} // Shrink on mouse out
                      src={selectedImage[index]} alt="Vehicle Tire" />
                  </div>
                  <p >Classification : {item.class} </p>
                  <p >Confidence : {item.confidence} </p>
                  <hr />

                </div>))}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" onClick={handleCloseModal} data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  )
}