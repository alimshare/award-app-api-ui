import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';


const Email = () => {
    const [email, setEmail] = useState("string");

    const handleChange = event => {
        setEmail(event.target.value);
    };

    const checkEmailExists = () => {
        fetchData(email);
    }

    const fetchData = async (email) => {
        try {
            await axios.get(`http://localhost:8000/api/email?email=${email}`)
                .then((response) => {
                    console.log("success", response, response.data.data);
                    if (response.data.data.exists) {
                        window.location = "/home";
                    } else {
                        alert("email is not found");
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Typography variant="h3">Award</Typography>

                <p>Enter your email address to sign in and continue</p>

                <TextField fullWidth id="email" autoComplete='off' placeholder='Email Address' autoFocus={true} margin={"normal"} onChange={handleChange} />
                <Button variant="contained" color={"primary"} onClick={checkEmailExists} className="Button-signIn">
                    Sign In
                </Button>
            </header>
        </div>
    );
};

export default Email;