import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

export default function GuestDetails(props) {
    props.setSignInButton(true);
    const statusArray = [];
    const base64Array = [];
    const [NoData, setNoData] = useState(false);
    const [vno, setVNo] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [tollPlaza, setTollPlaza] = useState('');
    const [date, setDate] = useState('');
    const [res, setRes] = useState(false);
    const [loader, setLoader] = useState(false);

    const handleVnoChange = (event) => {
        setVNo(event.target.value);
        setPhoneNo('');
        setRes(false);
        setLoader(false);
        setNoData(false);
    }

    const handleSubmit = async (e) => {
        setLoader(true);
        setNoData(false);
        setRes(false);
        e.preventDefault();
        const response = await axios.get(`http://${window.location.hostname}:4000/guestDet`, {
            params: {
                vehicleNumber: vno,
            },
        });
        if (response.data === "No Data Found") {
            console.log("No Data Found");
            setRes(false);
            setLoader(false);
            console.log(response.data)
            setNoData(response.data);
        }
        else {

            console.log(response.data)
            setPhoneNo(response.data.userMobileNumber);
            setTollPlaza(response.data.tollPlaza);
            setDate(response.data.date);
            for (let i = 0; i < response.data.tyreStatus; i++) {
                statusArray.push(response.data.tyreStatus[i]);
            }
            for (let i = 0; i < response.data.userTyre64.length; i++) {
                base64Array.push(response.data.userTyre64[i]);
                base64Array[i] = "data:image/jpeg;base64," + base64Array[i];
            }

            setLoader(false)
            setRes(true);
        }
    }

    return (
        <div className="parentgd container d-flex justify-content-center mt-5">
            <div className='GuestDetails container  rounded-4 p-4 bg-black  border border-3 border-white' style={{ maxWidth: "600px" }} >
                <div className='row'>
                    <form onSubmit={handleSubmit}>
                        <div className='col'>
                            <h1 style={{ color: 'white' }}>Check Your Vehicle Details</h1>
                        </div>
                        <div className="col">
                            <input type="text" onChange={handleVnoChange} className="form-control border border-black" placeholder='VehivleNumber' name="VehicleNumber" id="vehicleU" required />
                        </div>
                        <div className="row">
                            <div className="col-sm-3 mt-2">
                                <Link to="/guest" className="btn btn-warning back" id="blackbut">Go Back</Link>
                            </div>
                            {res && <div className="col-sm-3 mt-2">
                                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#backdrop" >Result</button>
                            </div>}
                            {NoData && <div className="col-sm-3 mt-2 me-1">
                                <p class="btn btn-danger">NotFound</p>
                            </div>}
                            <div className="col-sm-3 mt-2">
                                <button type="submit" className="btn btn-primary detSub">Submit</button>
                            </div>
                        </div>
                        {loader && <Loader />}
                        <div className="modal fade" id="backdrop" tabIndex="-1" aria-labelledby="backdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="backdropLabel">Result</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {res && statusArray.map((item, index) => (
                                            <div className='row text-center mb-4 mt-3'>
                                                <p >Vehicle Number: {vno} </p>
                                                <p >Mobile Number: {phoneNo} </p>
                                                <p >Vehicle Number: {tollPlaza} </p>
                                                <p >Vehicle Number: {date} </p>
                                                <p >Classification : {item.class} </p>
                                                <p >Confidence : {item.confidence} </p>
                                                <div id="getImg" >
                                                    <img className="enlarge" style={{ width: '200px', height: 'auto', borderRadius: '10px', transition: 'width 0.3s ease' }} // Shrink on mouse out
                                                        src={base64Array[index]} alt="Vehicle Tire" />
                                                </div>
                                                <hr />
                                                <br />
                                            </div>))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}