import { useContext, useEffect, useState } from "react";
import Courosal from "../Courosal";
import Proposals from "../Proposals";
import Navbar from "../navbar/Navbar1";
import EventContext from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"


export default function Home() {

    const { select } = useContext(EventContext);
    const navigate = useNavigate();
    const [getDeSelect, SetgetDeSelect] = useState(true)
    const [proposal, setProposal] = useState([]);

    function deleteSelect() {
        localStorage.removeItem("selectedProposal")
        SetgetDeSelect(false)
    }

    const loadData = async () => {

        let response = await fetch('http://localhost:8080/api/getproposal')
        response = await response.json();
        //console.log(response.data)
        setProposal(response.data)

    }
    useEffect(() => {
        loadData()
        if(
            !localStorage.getItem('headers') &&
            !localStorage.getItem('userlogin')
        ){
            navigate('/')
        }
    }, [])

    useEffect(() => {

    }, [getDeSelect])

    return (
        <div>
            <Navbar />
            <Courosal />
            <div>
                {(localStorage.getItem("selectedProposal")) ? (<div>
                    <div className="container">
                    <h4 className="mx-4 mt-2">Selected Proposal</h4>
                     <div className="col-12 col-md-6 col-lg-3">
                     <Link to={`/viewproposal/${select._id}`} style={{ textDecoration: "none" }}>
                            <div className=" card mt-4 mx-4 mb-2 shadow p-2 mb-3 bg-white rounded" id="card" style={{ "width": "16rem", "maxHeight": "250px" }}>
                                <img src={select.Images} className="card-img-top" alt="..." style={{ height: "140px", objectFit: "fill" }} />
                                <div className="d-flex">
                                    <div>
                                        <h6 className="card-title mx-2 ">{select?.Event_Name} </h6>
                                        <h6 className="card-title mx-2 ">{select?.Budget}/-</h6>
                                        <h6 className="card-title mx-2 ">{select?.Place_of_event}</h6>
                                    </div>

                                    <Link to={'/userHome'}> <button className="btn bg-info  mt-4 mx-5 " onClick={deleteSelect}>Delete</button> </Link>

                                </div>
                            </div>
                        </Link> 
                     </div>
                    </div>
                </div>) : (<div>

                </div>)}
            </div>
            <div>
                <div className="container">
                <h4 className="mx-4 mt-2">Proposals</h4>
                    <div className="row mb-3">

                        {proposal.map((item) => {

                            return (
                                <div key={item._id} className="col-12 col-md-6 col-lg-3">
                                    <Proposals item={item} />

                                </div>
                            )

                        })}


                    </div>
                </div>


            </div>


        </div>
    )
}