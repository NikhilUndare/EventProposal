
import { Link } from "react-router-dom"
import "./navbar/Navbar.css"


export default function Proposals(props) {
    let item = props.item
    // console.log(item)
    // console.log(item._id)
    return (
        <div>
            <Link to={`/viewproposal/${item._id}`} style={{ textDecoration: "none" }}>
                <div className=" card mt-4 mx-4 mb-2 shadow p-2 mb-3 bg-white rounded" id="card" style={{ "width": "16rem", "maxHeight": "250px" }}>
                    <img src={item.Images} className="card-img-top" alt="..." style={{ height: "140px", objectFit: "fill" }} />
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mx-3 mt-1 ">{item?.Event_Name} </h6>
                            <h6 className="card-title mx-3 ">{item?.Budget}/-</h6>
                            <h6 className="card-title mx-3 ">{item?.Place_of_event}</h6>
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    )
}