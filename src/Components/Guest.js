import React from "react";
import { Link } from "react-router-dom";
export default function Guest(props) {
    props.setSignInButton(true);
    return (
        <div className="parentg">
            <div className="Guest container shadow-lg rounded-3 m-0 border border-black"style={{background:'white'}} >
                <div className="row">
                    <div className="col-sm-12 mt-4 text-center ">
                        <Link to="/guest/upload" type="button" className="btn btn-info Guestbt">Upload Your Tire Image Here</Link>
                    </div>
                    <div className="col-sm-12 mt-4 text-center">
                        <Link to="/guest/checkdetails" type="button" className="btn btn-info Guestbt" >Check Your Vehicle Details</Link>
                    </div>
                    <div className="col-sm-12 mt-4 mb-2 text-center">
                        <Link to="/" className="btn btn-dark backb">Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}