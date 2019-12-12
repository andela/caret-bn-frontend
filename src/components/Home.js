import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="header">
      <h1>Welcome to barefoot Nomad</h1>
        <br />
        <h4>
          <Link to="/login" className="link">Login</Link>
        </h4>
        <br />
        <h4>
          <Link to="/register" className="link">Register</Link>
        </h4>
        <br />
    </div>
  );
}
