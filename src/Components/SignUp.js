import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

  //here i have defined a state for the user credentials and useNavigate hook
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirm_password: "" })
  const navigate = useNavigate();

  //below i have defined a onSubmit async method in which i am making a POST API request to the given url for user creation 
  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials // by doing destructuring we can pass the values present in the array in the body of the api request
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //sending name, email and password in the request body.
      body: JSON.stringify({ name, email, password })
    });

    //storing the json reponse got from the API.
    const json = await response.json();
    console.log(json);

    //checking if the json reponse contains success=true if yes then navigate user to login page, else show a alert. 
    if (json.success) {
      navigate("/login");
      props.showAlert("Account created successfully", "success");
    }
    else {
      props.showAlert("Invalid details", "danger");
    }
  }

  const onChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    //here using onchange, requires and minlength.
    <div className='container'>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name="name" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirm_password" name="confirm_password" onChange={onChange} required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
