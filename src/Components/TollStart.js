import React from "react";
import { Link } from "react-router-dom";

export default function TollStart(props) {
    props.setSignInButton(false);
  console.log(document.cookie);
    return (
        
            <div className="container">
                <div className="mt-5 d-flex container flex-column justify-content-center align-items-center shadow-lg border border-white p-4"style={{borderRadius:'10px', backgroundColor:'white'  }}>
                <h2 className="shadow-lg border border-black p-4 rounded-4 " >Toll Plaza: {props.selectedToll}</h2>
                <div className="row mt-4 d-flex justify-content-center">
                    <div className="col-sm-5 m-1 d-flex justify-content-center">
                    <Link to="/toll/upload" type="button" className="btn btn-dark  d-flex w-75 justify-content-center">
                            UPLOAD DATA
                    </Link>
                    </div>

                    <div className="col-sm-6 m-1 d-flex justify-content-center">
                    <Link to="/toll/checkrecords" type="button" className="btn btn-dark d-flex w-75 justify-content-center">
                            CHECK RECORDS
                    </Link>
                    </div>
                    <div className="col-sm-5 m-1 d-flex justify-content-center">
                        <Link type="button" id="button3" className="btn btn-dark  d-flex w-75 justify-content-center">
                        HOW TO
                    </Link></div>
                    <div className="col-sm-6 m-1 d-flex justify-content-center">
                    <Link type="button" id="button4" className="btn btn-dark d-flex w-75 justify-content-center">
                        HELP
                    </Link>
                    </div>
                </div>
            </div>
            </div>
        
    );
}