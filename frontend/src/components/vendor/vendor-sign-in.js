import React, { useState } from "react";
import axios from "axios";
import VendorSignUp from "./vendor-sign-up";
import UserSignIn from "../user/user-sign-in";
import "./vendor-sign-in.css"

const VendorSignIn = () => {
    const [data, setFormValues] = useState({});
    const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
    const [err, setError] = useState("");
    const handleCreateAccount = () => {
        setShowCreateAccountForm(true);
    };
    const handleSignUpSuccess = () => {
        setShowCreateAccountForm(false);
    };
    const handleErrors = (e) => {
        e.preventDefault();
        if (data.email === "" || !data.password === "") {
            setError("Kindly Fill all the details")
            return false
        }
        console.log(data, "handleerrors")
        let regexEmail = /^\w+([\.-]?\w+)*@gmail\.com$/g
        if (data.email.includes("@") || data.email.includes(".")) {
            if (!regexEmail.test(data.email)) {
                setError("invalid email format")
                return false
            }
        }
        return true
    }
    async function handleSubmit(e) {
        e.preventDefault();

        const fun = handleErrors(e)
        if (fun) {
            setError("")
            await axios.post("https://hfg-9hbu.onrender.com/api/vendorlogin", {
                email: data.email,
                password: data.password
            }).then((res) => {
                if ("password not matching" === res.data) {
                    alert("Incorrect password")
                } else {
                    alert(`${JSON.stringify(data.email.split("@")[0])} sucessfully logined`)
                }
            }).catch((e) => {
                alert("user not found")
            })
        }
    }
    return (
        <div className="div-main">
            <h2 id="main-logo">LOGO</h2>
            <div id="container">
                <div id="sub-container-1">
                    <h1 id="side-heading">TEXT WILL BE DIPLAYED HERE</h1>
                </div>
                <div id="sub-container-2">
                    <div className="container1">
                        <div className={`box ${showCreateAccountForm ? "expanded" : ""}`}>
                            <input
                                type="radio"
                                className="tab-toggle"
                                name="tab-toggle"
                                id="tab1"
                                defaultChecked
                            />
                            <input
                                type="radio"
                                className="tab-toggle"
                                name="tab-toggle"
                                id="tab2"
                            />
                            <ul className="tab-list">
                                <li className="tab-item">
                                    <label className="tab-trigger" htmlFor="tab1">
                                        Vendor
                                    </label>
                                </li>
                                <li className="tab-item">
                                    <label className="tab-trigger" htmlFor="tab2">
                                        User
                                    </label>
                                </li>
                            </ul>
                            <div className="tab-container">
                                <div className="tab-content">
                                    {showCreateAccountForm ? (
                                        <VendorSignUp onSignUpSuccess={handleSignUpSuccess} />
                                    ) : (
                                        <form id="form-container" onSubmit={handleSubmit}>
                                            <h4 id="form-heading">Sign in your Account</h4>
                                            <span id="errMsg">{err ? `*${err}*` : ""}</span>
                                            <input
                                                type="text"
                                                placeholder="Email"
                                                id="vendor-contact"
                                                onChange={(e) =>
                                                    setFormValues(
                                                        { ...data, email: e.target.value },
                                                        setError("")
                                                    )
                                                }
                                            />
                                            <br />
                                            <input
                                                placeholder="Password"
                                                id="vendor-password"
                                                type="password"
                                                onChange={(e) =>
                                                    setFormValues(
                                                        { ...data, password: e.target.value },
                                                        setError("")
                                                    )
                                                }
                                            />
                                            <br />
                                            <span id="forget-password">Forget Password?</span>
                                            <span id="create-account" onClick={handleCreateAccount}>
                                                Create Account
                                            </span>
                                            <button
                                                type="submit"
                                                id="vendor-btn"
                                            >
                                                SIGN IN
                                            </button>
                                        </form>
                                    )}
                                </div>
                                <div className="tab-content">
                                    <UserSignIn />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorSignIn;
