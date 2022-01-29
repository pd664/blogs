import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs'
import '../styles/signup.css'

function SignUp(props) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clickHandler = () => {
        setLoading(true);
        axios.post('http://localhost:4000/users/signup', {
            name : name,
            username: username,
            password: hashIt(password)
        })
        .then((res) => {
            setLoading(false);
            alert(res.data.message)
            props.history.push('/signin')
        })
        .catch((err) => {
            setLoading(false);
            setError(err.response.data.message);
        })
    }

    const hashIt = (password) => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    const handleSignup = () => {
        props.history.push('/signin')
    }
    return(
         <div id="signup" className="d-flex flex-column justify-content-center align-items-center mt-0">
             <div className="signupcontainer w-25 container">
                 <div className="signinbody d-flex flex-column align-items-center container">
                 <div className="heading mt-4">
                        <h1>SIGN UP</h1>
                    </div>
                    <div className="d-flex flex-column mt-4 w-100">
                    <form className="p-3">
                        <input className="w-100" type="text" name="name" placeholder="Enter Your full name" onChange={(e) => setName(e.target.value)} required />
                        <input className="w-100 mt-5" type="text" name="username" placeholder="Enter a unique username" onChange={(e) => setUsername(e.target.value)} required />
                        <input className="w-100 mt-5" type="password" name="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)} required />
                        <input className="w-100 mt-5 " type="button" name="submit" value={loading ? 'Loading...' : 'SIGN UP'} onClick={clickHandler} disabled={loading} />
                        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                        <small><span id="or"></span> OR</small><br />
                        <small><span id="acc" >Have an account? </span></small>
                        <input className="w-100 mt-2 mb-5" type="button" value={loading ? 'Loading...' : 'SIGN IN'} onClick={handleSignup} disabled={loading} />
                    </form>
                    
                    </div>
                </div>
             </div>
    </div>
    );
}

export default SignUp;
