import React, { useState } from "react";
import "../vendor/vendor-sign-up.css"
import "./user.css"
import axios from "axios";

const UserSignUp = (props) => {
    const [data, setFormValues] = useState({});
    const [err, setError] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        props.onSignUpSuccess();
    };
    const handleErrors=(e)=>{
        e.preventDefault();
        console.log(data,"handleerrors")
        if (!data.contact || !data.name || !data.email || !data.password) {
            setError("Kindly Fill all the details");
            return false;
        }
        //eslint-disable-next-line
        let regexEmail=/^\w+([\.-]?\w+)*@gmail\.com$/g
        if(!regexEmail.test(data.email)){
            setError("invalid email format")
            return false
        }
        if(data.contact.length!==10){
            setError("incorrect contact")
            return false
        }
        if (data.password !== data.confirmPassword) {
            setError("Passwords are not matching");
            return false
        }
        return true
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const fun = handleErrors(e)
        // let formdata = new FormData(e.target);
        if(fun){
            setError("")
            await axios.post("https://hfg-9hbu.onrender.com/api/createuser",{
            name:data.name,
            email:data.email,
            contact:data.contact,
            password:data.password
          }).then((res)=>{
            console.log(res.data,"res")
            alert(`${JSON.stringify(data.name)} thanks for regestering`)
            props.onSignUpSuccess();
            
          }).catch((e)=>{
            console.log(e.message)
            alert("existing email/contact")
          })
        }
    }

    return (
        <div className="box1">
            <h4 id="SignUp-Heading">Register in your Account</h4>
            <span id="err-block2">{err?`*${err}*`:""}</span>
            <form id="form" onSubmit={handleSubmit}>
                <input type="text"
                placeholder="Name"
                 id="user-name"
                value={data.name}
                onChange={(e) =>
                     setFormValues({ ...data, name: e.target.value })}
                /><br />
                <input type="email" placeholder="Email" 
                id="user-email"
                value={data.email}
                onChange={(e) =>
                setFormValues({ ...data, email: e.target.value })}
                /><br />
                <input
                type="number"
                placeholder="Contact"
                id="userContact"
                value={data.contact}
                onChange={(e) => 
                    setFormValues({ ...data, contact: e.target.value })}
                /><br />
                <input type="password"
                placeholder="Password"
                id="user-passowrd"
                value={data.password}
                onChange={(e) => 
                setFormValues({ ...data, password: e.target.value })}
                /><br />
                <input 
                type="password"
                placeholder="Confirm Password"
                id="user-conPassword"
                value={data.confirmPassword}
                onChange={(e) => 
                    setFormValues({ ...data, confirmPassword: e.target.value })}
                /><br />
                <button type="submit" id="user-btn2">REGISTER</button>
            </form>
            <span onClick={handleSignUp} id="signin-btn2">SignIn</span>
        </div>
    );
};

export default UserSignUp;
