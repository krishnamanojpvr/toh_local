import React from "react";
import { Link } from "react-router-dom";

export default function TollStart(props) {
    props.setSignInButton(false);
  console.log(document.cookie);
    return (
        <div className="container ">
            <div className="mt-5 d-flex flex-column justify-content-center align-items-center shadow-lg border border-black p-4"style={{borderRadius:'10px'  }}>
                <h2 className="shadow-lg border border-black p-4" style={{ fontFamily: "sans-serif",borderRadius:'10px'  }}>Toll Plaza: {props.selectedToll}</h2>
                <div className="mt-4">
                    <Link to="/toll/upload">
                        <button type="button" id="button1" className="btn btn-dark mx-2">
                            UPLOAD DATA
                        </button>
                    </Link>
                    <Link to="/toll/checkrecords">
                        <button type="button" id="button2" className="btn btn-dark mx-2">
                            CHECK RECORDS
                        </button>
                    </Link>
                </div>
                <div className="mt-4">
                    <button type="button" id="button3" className="btn btn-dark  mx-2 mb-5">
                        HOW TO
                    </button>
                    <button type="button" id="button4" className="btn btn-dark mx-2 mb-5">
                        HELP
                    </button>
                </div>
            </div>
        </div>
    );
}