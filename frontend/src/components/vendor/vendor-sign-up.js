import React, { useState } from "react";
import "./vendor-sign-up.css"
import axios from "axios";

const VendorSignUp = (props) => {
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
        let regexEmail=/^\w+([\.-]?\w+)*@gmail\.com$/g
        if(!regexEmail.test(data.email)){
            setError("invalid email format")
            return false
        }
        if(data.contact.length!==10){
            setError("incorrect contact")
            return false
        }
        if(data.password.length < 6){
            setError("password should have 6 or more characters")
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
        const fun = handleErrors(e);
        if(fun){
            setError("")
            await axios.post("http://localhost:8080/api/vendorregister",{
            name:data.name,
            email:data.email,
            contact:data.contact,
            password:data.password
          }).then((res)=>{
            console.log(res.data,"res")
            alert(`${JSON.stringify(res.data.name)} thanks for regestering`)
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
            <span id="err-block">{err?`*${err}*`:""}</span>
            <form id="form" onSubmit={handleSubmit}>
                <input type="text"
                 placeholder="Name" id="vendor-name"
                    value={data.name}
                    onChange={(e) => 
                        setFormValues({ ...data, name: e.target.value })}
                /><br />
                <input type="email" 
                placeholder="Email" 
                id="v-email"
                    value={data.email}
                    onChange={(e) => setFormValues({ ...data, email: e.target.value })}
                /><br />
                <input 
                type="number" 
                placeholder="contact" 
                id="v-contact"
                    value={data.contact}
                    onChange={(e) => setFormValues({ ...data, contact: e.target.value })}
                /><br />
                <input 
                type="password"
                placeholder="Password"
                id="v-password"
                    value={data.password}
                    onChange={(e) =>
                    setFormValues({ ...data, password: e.target.value })}
                /><br />
                <input 
                type="password" 
                placeholder="Confirm Password" 
                id="v-Cpassword"
                    value={data.confirmPassword }
                    onChange={(e) => 
                setFormValues({ ...data, confirmPassword: e.target.value })}
                /><br />
                <button 
                type="submit" 
                id="v-btn">
                    REGISTER</button>
            </form>
            <span onClick={handleSignUp} id="signin-btn">SignIn</span>
        </div>
    );
};

export default VendorSignUp;
