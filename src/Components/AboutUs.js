import React from 'react'
import { Link } from 'react-router-dom'
export default function AboutUs(props) {
  props.setSignInButton(true);
  return (
    <div className="AboutUs">
      <div className="row row-cols-1 row-cols-sm-2 g-4">
        <div className="col">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Varun</h5>
              <p className="card-text">Naa muddhu peru pettukunna Varun Reddy, Naa inti mundhu penchukunna pacha endugaddi</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Shiva</h5>
              <p className="card-text">Sendhil</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Deepak</h5>
              <p className="card-text">Tire is Black, black is dark, Dark is Me</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Gargey</h5>
              <p className="card-text">Nenu sarada ke practice app uninstall chesinodini. . . , inka nuvvu git repo project antunnav. . . chusko malla</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Charan</h5>
              <p className="card-text">my name is 1Z</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Manoj</h5>
              <p className="card-text">Hello ra Manoj</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="map-example">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60916.877541305425!2d78.490234!3d17.397152!3m2!1i1024!
                2i768!4f13.1!3m3!1m2!1s0x3bcb99c44533324f%3A0x8aa5456a7d836bb5!2sKeshav%20Memorial%20Institute%20of%20Technology!5e0!3m2!
                1sen!2sin!4v1704704926760!5m2!1sen!2sin" title="CLocation" style={{ width: "600px", height: "450px", border: "10", marginTop: "20px" }} allowfullscreen=""
            loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div>
          <h3>Contact Us On:</h3>
          <Link to="" target="_blank">
            <span class="material-symbols-outlined" style={{color:"blue"}}>
              mail
            </span>
          </Link>
          <Link to="" target="_blank"></Link>
        </div>
      </div>
    </div>
  )
}

