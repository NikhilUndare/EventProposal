import React, { useState } from "react";
import axios from "axios";
import UserSignUp from "./user-sign-up";
import "./user.css";
import { useNavigate } from "react-router";

const UserSignIn = () => {
    const navigate = useNavigate()
    const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
    const [data, setFormValues] = useState({});
    const [err, setError] = useState("");
    const handleCreateAccount = () => {
        setShowCreateAccountForm(true);
    };
    const handleSignUpSuccess = () => {
        setShowCreateAccountForm(false);
    };
    const handleErrors=(e)=>{
        e.preventDefault();
        console.log(data,"handleerrors")
        if (!data.email || !data.password) {
            setError("Kindly Fill all the details")
            return false
        }
        //eslint-disable-next-line
        let regexEmail=/^\w+([\.-]?\w+)*@gmail\.com$/g
            if(!regexEmail.test(data.email)){
                setError("invalid email format")
                return false
            }
        return true
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const fun = handleErrors(e)
        if(fun){
            setError("")
            await axios.post("http://localhost:8080/api/login",{
            email:data.email,
            password:data.password
          }).then((res)=>{
            if("password not matching"===res.data){
                alert("Incorrect password")
            }else{
                console.log(res.data)
                alert(`${JSON.stringify(data.email.split("@")[0])} sucessfully logined`)
                
                localStorage.setItem("headers",res.data.authToken)
                localStorage.setItem("userdata",JSON.stringify(res.data.userdata))
                localStorage.setItem("userlogin",true)
                navigate('/userHome')
            }       
          }).catch((e)=>{
            alert("user not found")
          })
        }
    }

    return (
        <div className={`box1 ${showCreateAccountForm ? "expanded1" : ""}`}>
            {showCreateAccountForm ? (
                <UserSignUp onSignUpSuccess={handleSignUpSuccess} />
            ) : (
                <div>
                    <form id="form-container">
                        <h4 className="margin-right" id="form-heading">Sign in your Account</h4>
                        <span id="errMsg">{err?`*${err}*`:""}</span>
                        <input
                            type="text"
                            placeholder="Email"
                            id="vendor-contact"
                            onChange={(e) => setFormValues({ ...data, email: e.target.value }, setError(""))}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            id="vendor-password"
                            onChange={(e) => setFormValues({ ...data, password: e.target.value }, setError(""))}
                        />
                        <br />
                        <span id="forget-password">Forget Password?</span>
                        <span id="create-account" onClick={handleCreateAccount}>
                            Create Account
                        </span>
                        <button type="submit" id="vendor-btn" onClick={handleSubmit}>
                            SIGN IN
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserSignIn;
