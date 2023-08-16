import "./Navbar.css";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import profile from '../../../assets/profliepic1.jpeg'
export default function Navbar() {
  const[open,setOpen] = useState(false)
    const navigate = useNavigate()

    function handleOpen(){
        setOpen(!open)
    }
    function handleLogOut(){
        localStorage.removeItem('headers')
        localStorage.removeItem('userlogin')
        navigate('/')
    }
  let {name}=JSON.parse(localStorage.getItem("userdata"))
  return (
    <div>
      <nav className="navbar bg-body-tertiary    ">
        <div className="container-fluid">
          <p className="navbar-brand fs-2 text-primary mx-4" href="#" id="logo">
            LOGO
          </p>
          <form className="d-flex ">
                       <p className="text-primary me-4 mt-2 fs-5"><strong>{name}</strong> </p>
                      <div className='dropdown'> <img src={profile} alt="profile pic" id="img" onClick={handleOpen}  style={{ height: "40px", width: "40px", objectFit: "fill" }}/>
                      { open ?<button className="btn bg-danger text-white  mx-2 rounded" onClick={handleLogOut}>logout</button> : ""}
                       </div>
                    </form>
        </div>
      </nav>
    </div>
  );
}
