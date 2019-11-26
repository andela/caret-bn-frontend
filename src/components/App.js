import React from 'react';
import { Link } from 'react-router-dom';

const App = () => (
    <div>
        <h1> Welcome to Barefoot Nomad App</h1>
        <h2>
<Link to="/users">Go to users route</Link>
        </h2>
    </div>
);

export default App;
