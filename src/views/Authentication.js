import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';

const Users = () => (
        <div>
            <p>
<Link to="/">Home</Link>
            </p>
            <h1> This is the main user component </h1>
            <Login />
        </div>
);

export default Users;
