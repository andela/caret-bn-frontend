import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Notifications, AccountCircle,
  ExitToApp, FileCopy, HomeOutlined,
} from '@material-ui/icons';
import AirlineSeatFlatAngled from '@material-ui/icons/AirlineSeatFlatAngled';
import barefootLogo from '../../assets/images/foot-print.png';

const MenuComponent = (props) => {
  const { pathname } = props;
  console.log('pathname MenuComp ===> ', pathname);
  const urls = ['/login', '/register', '/forgotpassword'];
  const displayMenu = !(urls.includes(pathname) || pathname.match(/resetpassword/) || pathname.match(/verify/));

  if (displayMenu) {
    return (
        <Navbar data-test="menu-test" bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
            <img src={barefootLogo} className="navbar-logo" alt="barefoot nomad" />
            {' '}
            Barefoot Nomad
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Link to="/">
                    <div className="account-icon">
                        <HomeOutlined className="icon" />
                        Home
                    </div>
                </Link>
                <Link to="/requests">
                    <div className="account-icon">
                        <FileCopy className="icon" />
                        Requests
                    </div>
                </Link>

                <Link to="/accommodations">
                    <div className="account-icon">
                        <AirlineSeatFlatAngled className="icon" />
                        Accommodations
                    </div>
                </Link>

                <Link to="#">
                    <div className="account-icon">
                        <Notifications className="icon" />
                        Notifications
                    </div>
                </Link>
                <Link to="#">
                    <div className="account-icon">
                        <AccountCircle className="icon" />
                        Thanos
                    </div>
                </Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
  }
  return null;
};

MenuComponent.propTypes = {
  pathname: PropTypes.string,
};

export default MenuComponent;
