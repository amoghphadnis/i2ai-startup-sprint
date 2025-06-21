import React from 'react';

export default function Register() {
    return (
        <div className="register">
            <h1>Register</h1>
            <p>
                Welcome to i2u.ai! Please fill out the form below to register and start your journey towards building your dream startup.
            </p>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                
                <button type="submit">Register</button>
            </form>
        </div>
    );
}