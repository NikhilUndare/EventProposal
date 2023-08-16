import { useNavigate } from 'react-router-dom'
import pic from '../../../assets/profliepic1.jpeg'
import "./Navbar.css"
import { useState } from 'react'

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
    return (
        <div>
            <nav className="navbar bg-body-tertiary    ">
                <div className="container-fluid">
                    <p className="navbar-brand fs-2 text-primary mx-3" href="#" id="logo">LOGO</p>
                    <form className="d-flex ">
                       <p className="text-primary me-4 mt-2"><strong>User Name</strong> </p>
                      <div className='dropdown'> <img src={pic} alt="profile pic" id="img" onClick={handleOpen}  style={{ height: "40px", width: "40px", objectFit: "fill" }}/>
                      { open ?<button className="btn bg-danger text-white  mx-2 rounded" onClick={handleLogOut}>logout</button> : ""}
                       </div>

                     
                    </form>
                    
                </div>
            </nav>
            
        </div>
    )
}

