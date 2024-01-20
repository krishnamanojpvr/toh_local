import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Navbar({ signInButton }) {
  const navigate = useNavigate()
  const handleLogOut = async (e) => {
    e.preventDefault()
    const response = await axios.get(`http://${window.location.hostname}:4000/logout`, { withCredentials: true })
    if (response.data) {
      navigate('/toll');
    }

  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body fixed-top " data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TiresOnHighways</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">AboutUs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faq">FAQ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stats">Statistics</Link>
            </li>
          </ul>
          {signInButton && (<form className="nav-item">
            <Link className="btn btn-light btn-outline-dark" to="/toll">Toll Sign In</Link>
          </form>)}
          {!signInButton && (<form className="nav-item">
            <Link className="btn btn-danger" onClick={handleLogOut}>Sign Out</Link>
          </form>)}
        </div>
      </div>
    </nav>
  )
}
