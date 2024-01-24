import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

export default function GuestDetails(props) {
    props.setSignInButton(true);
    const statusArray = [];
    const base64Array = [];

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
    }

    const handleSubmit = async (e) => {
        setLoader(true);
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
        }
        else {

            console.log(response.data)
            setPhoneNo(response.data.userMobileNumber);
            setTollPlaza(response.data.tollPlaza);
            setDate(response.data.date);
            for (let i = 0; i < response.data.tyreStatus.length; i++) {
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
        <div className="parentgd">
            <div className='GuestDetails container m-0 border border-black rounded-4 shadow p-4' style={{ background: 'white  ' }}>
                <div className='row'>
                    <form onSubmit={handleSubmit}>
                        <div className='col'>
                            <h1>Enter Vehicle Number</h1>
                        </div>
                        <div className="col">
                            <label htmlFor="vehicleU" className="form-label">VehicleNumber</label>
                            <input style={{ borderColor: 'black' }} type="text" onChange={handleVnoChange} className="form-control" name="VehicleNumber" id="vehicleU" required />
                        </div>
                        <div className="row">
                            <div className="col-sm-3 mt-2">
                                <Link to="/guest" className="btn btn-warning back" id="blackbut">Go Back</Link>
                            </div>
                            <div className="col-sm-3 mt-2">
                                <button type="submit" className="btn btn-primary detSub">Submit</button>
                            </div>
                        </div>
                        {loader && <Loader/>}
                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Result</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                {res && statusArray.map((item, index) => (<div className='row text-center mb-4 mt-3'>
                                    <p >Classification : {item.class} </p>
                                    <p >Confidence : {item.confidence} </p>
                                    <div id="getImg" >
                                        <img className="enlarge" style={{ width: '200px', height: 'auto', borderRadius: '10px', transition: 'width 0.3s ease' }} // Shrink on mouse out
                                            src={base64Array[index]} alt="Vehicle Tire" />
                                    </div>
                                    <br/>
                                    <hr />
                                </div>))}

                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}