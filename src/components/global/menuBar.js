import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {
  Notifications, AccountCircle,
  ArrowDropDown, HomeOutlined,
} from '@material-ui/icons';
import AirlineSeatFlatAngledIcon from '@material-ui/icons/AirlineSeatFlatAngled';
import barefootLogo from '../../assets/images/foot-print.png';

const MenuBar = () => (
        <Navbar bg="primary" className="menuBar mb-3" variant="dark">
            <Navbar.Brand className="logo" href="/">
                <img src={barefootLogo} alt="barefoot nomad" />
                Barefoot Nomad
            </Navbar.Brand>
            <Nav className="mr-auto" />
            <Nav className="navigation-bar">
                <Nav.Link href="/">
                    <div className="account-icon">
                        <HomeOutlined />
                        Home
                    </div>
                </Nav.Link>
                <Nav.Link href="/accommodations">
                    <div className="account-icon">
                        <AirlineSeatFlatAngledIcon />
                        Accommodations
                    </div>
                </Nav.Link>
                <Nav.Link href="#">
                    <div className="account-icon">
                        <Notifications />
                        Notifications
                    </div>
                </Nav.Link>
                <Nav.Link href="#">
                    <div className="account-icon">
                        <div>
                            <AccountCircle fontSize="small" />
                            <ArrowDropDown />
                        </div>
                        User
                    </div>
                </Nav.Link>
            </Nav>
        </Navbar>
);

export default MenuBar;
