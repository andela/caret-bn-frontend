import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {
  Notifications, AccountCircle,
  ArrowDropDown, FileCopy, HomeOutlined, Hotel,
} from '@material-ui/icons';
import barefootLogo from '../../assets/images/foot-print.png';

const MenuComponent = () => (
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
                        <Hotel />
                        Accommodations
                    </div>
                </Nav.Link>
                <Nav.Link href="/requests">
                    <div className="account-icon">
                        <FileCopy />
                        Requests
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
                        Thanos
                    </div>
                </Nav.Link>
            </Nav>
        </Navbar>
);

export default MenuComponent;
