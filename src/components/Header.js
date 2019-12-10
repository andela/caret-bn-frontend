import React from 'react';
import footImage from '../assets/images/foot-print.png';

const Header = () => (
    <div className="header-component">
        <img src={footImage} alt="footprint" />
        <h2>Barefoot Nomad</h2>
        <h4>A step at a time</h4>
    </div>
);

export default Header;
