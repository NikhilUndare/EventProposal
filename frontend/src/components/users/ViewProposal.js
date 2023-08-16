import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { useEffect, useState } from "react";
import { useContext } from "react";
import EventContext from "./context/EventContext";


export default function ViewProposal() {
    
    const {handleSelect} = useContext(EventContext)
    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate();

    const [proposal, setProposal] = useState([]);

    const loadData = async () => {

        let response = await fetch(`http://localhost:8080/api/getproposal/${id}`)
        response = await response.json();
        // console.log(response.data)
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

    const SelectProposal = () =>{
        handleSelect(proposal)
        localStorage.setItem("selectedProposal",true)
        navigate('/userHome')

    }
    console.log(proposal)
    return (

        <div>
            <div>
                <div className=" shadow  mb-3 bg-white rounded">
                    <Navbar />
                </div>
                <div className="d-flex">
                    <h6 className="mx-5 mt-2">Proposals  </h6>  <h5 className="mx-5 fs-3">  {proposal?.Event_Name}</h5>
                </div>
                <div className="d-flex flex-row-reverse">

                    <Link to={'/userHome'}> <button className="mx-5 btn bg-info " >Back</button></Link>
                    <button className=" btn bg-info " onClick={SelectProposal} >Select</button>

                </div>
                {/* <hr /> */}
                <div className="row">
                    <div className=" card mt-4 mx-4 mb-2 shadow p-2 mb-3 bg-white rounded" id="card" style={{ "width": "20rem", "maxHeight": "400px" }}>
                        <img src={proposal?.Images} className="card-img-top" alt="..." style={{ height: "140px", objectFit: "fill" }} />
                        <div className="d-flex">
                            <div>
                                <div className="d-flex">
                                    <p className="mx-4 mt-1"><em>Name</em></p> <p className="mt-1"><strong>{proposal?.Vendor_name}</strong></p>
                                </div>
                                <div className="d-flex">
                                    <p className="mx-4 "><em>Email</em></p> <p className=""><strong>{proposal?.Vendor_email}</strong></p>
                                </div>
                                <div className="d-flex">
                                    <p className="mx-4 "><em>Start Date</em></p> <p className=""><strong>{proposal?.From_date}</strong></p>
                                </div>
                                <div className="d-flex">
                                    <p className="mx-4 "><em>End Date</em></p> <p className=""><strong>{proposal?.To_date}</strong></p>
                                </div>
                                <div className="d-flex">
                                    <p className="mx-4 "><em>Event Type</em></p> <p className=""><strong>{proposal?.Event_type}</strong></p>
                                </div>
                                <div className="d-flex">
                                    <p className="mx-4 "><em>Event Class</em></p> <p className=""><strong>Class A</strong></p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className=" card mt-4 mx-4 mb-2 shadow p-2 mb-3 bg-white rounded" id="card" style={{ "width": "30rem", "maxHeight": "400px" }}>

                        <h5 className="mx-2 my-2">Venue and Arrangements</h5>
                        <p className="mx-2">
                            {proposal?.Description}

                        </p>
                    </div>
                    <div className=" card mt-4 mx-4 mb-2 shadow p-2 mb-3 bg-white rounded" id="card" style={{ "width": "30rem", "maxHeight": "400px" }}>

                        <h5 className="mx-2 my-2">Food Preferences</h5>
                        <p className="mx-2">
                            {proposal?.Food_preferances}

                        </p>
                    </div>
                    <div className=" card mt-4 mx-4 mb-2 shadow p-2 mb-3 bg-white rounded" id="card" style={{ "width": "20rem", "maxHeight": "400px" }}>
                        <h5 className="mx-2 my-2">My Albums</h5>
                        <img src={proposal?.Images} className="card-img-top mx-3 my-2" alt="..." style={{ height: "100px", width: "100px", objectFit: "fill" }} />
                        <img src={proposal?.Images} className="card-img-top mx-3 my-2" alt="..." style={{ height: "100px", width: "100px", objectFit: "fill" }} />
                    </div>
                    <div className=" card mt-4 mx-4 mb-2 shadow p-2 mb-3 bg-white rounded" id="card" style={{ "width": "30rem", "maxHeight": "400px" }}>

                        <h5 className="mx-2 my-2">Contacts | 12</h5>
                        <div className="d-flex">
                            <p className="mx-4 mt-4 "><em>Contact 1</em></p> <p className="mt-4"><strong><em>+91 7894561230</em></strong></p>
                        </div>
                        <div className="d-flex">
                            <p className="mx-4 "><em>Contact 2</em></p> <p className=""><strong><em>+91 9856321470</em></strong></p>
                        </div>
                    </div>
                    <div className=" card mt-4 mx-4 mb-2 shadow p-2 mb-3 bg-white rounded" id="card" style={{ "width": "30rem", "maxHeight": "400px" }}>

                        <h5 className="mx-2 my-2">Events</h5>
                        <p className="mx-2">
                            {proposal?.Events}

                        </p>
                    </div>

                </div>


            </div>
        </div>

    )
}
