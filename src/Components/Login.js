import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    //below i have used the useState hooks to set the states with email and password as empty.
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    //navigate is use to navigate user to another page on an action
    const navigate = useNavigate();


    //below is the API request made to the backed where in the POST body i am sending the email and password from the credentilas state
    const submitForm = async (e) => {
        e.preventDefault(); // prevent the page against reloading 
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        // putting the response from the API to a const, await is used to wait while the promise gets resolved.

        const json = await response.json();
        console.log(json);

        //checking if the the API response has success=true 
        if (json.success) {
            //save the auth token and redirect the user to home page with a alert
            localStorage.setItem("authToken", json.auth_token);
            props.showAlert("Logged in successfully", "success");
            navigate("/");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    // for the user to see whats he is entering
    const onChange = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input id="email" name="email" type="email" className="form-control" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
