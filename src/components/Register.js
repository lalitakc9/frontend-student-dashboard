import { useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import './Register.css';

const REGISTER_URL = 'http://localhost:8081/v1/api/users/add';

const Register = () => {
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState(1);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL, {
                username: email,
                password,
                firstName,
                lastName,
                phoneNumber,
                status,
            });

            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);

            if (response.status === 200) {
                setSuccess(true);
            } else {
                setErrMsg('Failed to register Because Username already exists..');
            }
        } catch (error) {
            setErrMsg('Failed to register. Please try again.');
        }
    };

    return (
        <section className="register-section">
                            <p className='register-p'>Sign Up With Your Credential</p>

            {success ? (
                <div>
                    <h1 className='register-h1'>Success!</h1>
                    <p>
                        <Link to="/login">Sign In</Link>
                    </p>
                </div>
            ) : (
                <div>
                <form className='register-form' onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <p>{errMsg}</p>

                    <label className='register-label' htmlFor="email">Email:</label>
                    <input className='register-input' type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label className='register-label' htmlFor="password">Password:</label>
                    <input className='register-input' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label className='register-label' htmlFor="firstName">First Name:</label>
                    <input className='register-input' type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <label className='register-label' htmlFor="lastName">Last Name:</label>
                    <input className='register-input' type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                    <label className='register-label' htmlFor="phoneNumber">Phone Number:</label>
                    <input className='register-input' type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

                    <label className='register-label' htmlFor="status">Status:</label>
                    <select className='register-select' id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                    <button type="submit">Sign Up</button>
                </form>
                <p className="register-link">
                    Already registered?<br />
                    <span className="line">
                        <Link to="/login">Sign In</Link>
                    </span>
                </p>
                </div>
            )}
        </section>
    );
};

export default Register;
