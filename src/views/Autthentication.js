import React from 'react';
import { Link } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';

export default function Users() {
  return (
        <div>
            <p>
<Link to="/">Home</Link>
            </p>
            <h1> This is the main user component </h1>
            <LoginComponent />
        </div>
  );
}
