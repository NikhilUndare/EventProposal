import React, { useContext, useState } from "react";
import "./sample.css";
import { PostApi, PutApi } from "./Api_call";
import { useNavigate } from "react-router-dom";

import EventContext from "../users/context/EventContext";

function CreateVendor() {
  let api_update = useContext(EventContext);
  console.log(api_update.apiType["type"]);

  let navigate = useNavigate();
  const [file, setFile] = useState();
  const [showImage, setShowImage] = useState(false);
  function handleChange(e) {
    setImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    setShowImage(true);
  }

  function Validation(data) {
    let { EventName, Budget } = data;

    if (!/^[A-Za-z ]+$/.test(EventName)) {
      return "EventName is not alphanumeric";
    }
    if (!/^\d+$/.test(Budget)) {
      return "Budget must contain only numbers";
    }
    return;
  }

  const [EventName, setEventName] = useState("");
  const [PlaceofEvent, setPlaceofEvent] = useState("");
  const [ProposalType, setProposalType] = useState("");
  const [EventType, setEventType] = useState("");
  const [Budget, setBudget] = useState("");
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState({});
  const [Foodpreferances, setFoodpreferances] = useState("");
  const [Events, setEvents] = useState("");
  return (
    <div id="component-container">
      {/* <Navbar/> */}
      <div id="form-contain">
       
        <div id="hder">
        <h2 id="h2">Create Proposal</h2>
        <h1 
        id="x"
        onClick={()=>{
          navigate("/getproposal")
        }}
        >X</h1>
        </div>
       

        <hr style={{margin:"0px"}} />
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            let data = { EventName, Budget };
            let error = Validation(data);
            if (error) {
              alert(error);
            } else {
              let formdata = new FormData();
              formdata.append("Event_Name", EventName);
              formdata.append("Place_of_event", PlaceofEvent);
              formdata.append("Proposal_type", ProposalType);
              formdata.append("Event_type", EventType);
              formdata.append("Budget", Budget);
              formdata.append("From_date", From);
              formdata.append("To_date", To);
              formdata.append("Description", Description);
              formdata.append("Images", Image);
              formdata.append("Food_preferances", Foodpreferances);
              formdata.append("Events", Events);

              if (api_update.apiType["type"] === "PUT") {
                PutApi(formdata, api_update.apiType["id"]).then((data) => {
                  console.log(data);
                  navigate("/getproposal");
                });
              } else if (api_update.apiType["type"] === "POST") {
                PostApi(formdata).then((data) => {
                  console.log(data);
                  navigate("/getproposal");
                });
              }
            }
          }}
        >
          <div id="section-container">
            <section id="s1">
              <div id="evt-name">
                <label>Event Name</label>
                <br />
                <input
                  type="text"
                  id="event-name"
                  placeholder="Name"
                  onChange={(e) => {
                    setEventName(e.target.value);
                  }}
                  required
                />
              </div>

              <br />
              <div className="ib" id="event-place">
                <label>Place of Event</label>
                <br />
                <select
                  onChange={(e) => {
                    setPlaceofEvent(e.target.value);
                  }}
                  required
                >
                  <option>Select</option>
                  <option>Banglore</option>
                  <option>Mysore</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                </select>
              </div>

              <div className="ib" id="proposal-type">
                <label>Proposal Type</label>
                <br />
                <select
                  onChange={(e) => {
                    setProposalType(e.target.value);
                  }}
                  required
                >
                  <option>Select</option>
                  <option>Formal</option>
                  <option>Informal</option>
                  <option>Personal</option>
                  <option>Business</option>
                </select>
              </div>
              <br />
              <div id="event-type" className="ib">
                <label>Event Type</label>
                <br />
                <select
                  onChange={(e) => {
                    setEventType(e.target.value);
                  }}
                  required
                >
                  <option>Select</option>
                  <option>Marriage</option>
                  <option>Birthday</option>
                  <option>Reception</option>
                  <option>Business</option>
                </select>
              </div>
              <div id="budget" className="ib">
                <label>Budget</label>
                <br />
                <input
                  type="text"
                  placeholder="00000"
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                  required
                />
              </div>
              <br />
              <div className="ib" id="from-date">
                <label>From</label>
                <br />
                <input
                  type="date"
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="ib" id="To-date">
                <label>To</label>
                <br />
                <input
                  type="date"
                  onChange={(e) => {
                    setTo(e.target.value);
                  }}
                  required
                />
              </div>
              <br />

              <div id="description">
                <label>Description</label>
                <br />
                <input
                  type="text"
                  placeholder="Description"
                  id="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                />
              </div>
            </section>

            <section id="s2">
              <div id="image">
                <label>Image</label>
                <input
                  type="file"
                  placeholder="Add"
                  id="imageadd"
                  onChange={handleChange}
                  required
                />
                {showImage && (
                  <div id="img-container">
                    <img id="preview-image" src={file} alt="event" />
                  </div>
                )}
              </div>

              <div id="Food-prefer">
                <label>Food preferances</label>
                <br />
                <input
                  type="text"
                  placeholder="Preferances"
                  id="Preferances"
                  onChange={(e) => {
                    setFoodpreferances(e.target.value);
                  }}
                  required
                />
              </div>

              <div id="Events">
                <label>Events</label>
                <br />
                <input
                  type="text"
                  placeholder="Preferances"
                  id="events"
                  onChange={(e) => {
                    setEvents(e.target.value);
                  }}
                  required
                />
              </div>
            </section>
          </div>
          <hr />
          <button  id="submit" type="submit">
            POST
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateVendor;
