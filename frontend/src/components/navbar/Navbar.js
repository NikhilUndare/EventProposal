import "./Navbar.css";

export default function Navbar() {
  let {name}=JSON.parse(localStorage.getItem("userdata"))
  return (
    <div>
      <nav className="navbar bg-body-tertiary    ">
        <div className="container-fluid">
          <p className="navbar-brand fs-2 text-primary" href="#" id="logo">
            LOGO
          </p>
          <form className="d-flex">
            <p className="text-primary me-4 mx-2">{name}</p>
            <img src="" alt="profile pic" id="img" />
          </form>
        </div>
      </nav>
    </div>
  );
}
