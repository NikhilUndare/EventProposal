
import "./Navbar.css"

export default function Navbar() {
    return (
        <div>
            <nav className="navbar bg-body-tertiary    ">
                <div className="container-fluid">
                    <p className="navbar-brand fs-2 text-primary" href="#" id="logo">LOGO</p>
                    <form className="d-flex">
                       <p className="text-primary me-4 mx-2"> User Name</p>
                       <img src="" alt="profile pic" id="img"/> 
                    </form>
                </div>
            </nav>
            
        </div>
    )
}

