import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Notifications, AccountCircle,
  ExitToApp, FileCopy, HomeOutlined,
} from '@material-ui/icons';
import AirlineSeatFlatAngled from '@material-ui/icons/AirlineSeatFlatAngled';
import GroupIcon from '@material-ui/icons/Group';
import barefootLogo from '../../assets/images/foot-print.png';
import authHelper from '../../helpers/authHelper';

const { checkSupplier, checkAdmin } = authHelper;

const MenuComponent = (props) => {
  const { pathname } = props;
  const urls = ['/login', '/register', '/forgotpassword', '/registered'];
  const displayMenu = !(urls.includes(pathname) || pathname.match(/resetpassword/) || pathname.match(/verify/));

  if (displayMenu) {
    return (
            <Navbar data-test="menu-test" bg="primary" variant="dark" expand="lg">
                <Link to="/">
                    <Navbar.Brand>
                        <img src={barefootLogo} className="navbar-logo" alt="barefoot nomad" />
                        {' '}
                        Barefoot Nomad
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/">
                            <div className="account-icon">
                                <HomeOutlined className="icon" />
                                Home
                            </div>
                        </Link>
                        <Link to="/admin/users">
                    {!checkAdmin() ? null
                      : (
                        <div className="account-icon">
                            <GroupIcon className="icon" />
                            Users
                        </div>
                      )}
                        </Link>
                <Link to="/requests">
                    {checkSupplier() ? null
                      : (
                        <div className="account-icon">
                            <FileCopy className="icon" />
                            Requests
                        </div>
                      )}
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
                            <div className="account-icon">
                                <Dropdown alignRight>
                                    <Dropdown.Toggle id="dropdown-basic" size="sm">
                                    <AccountCircle className="icon" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/login" onClick={() => { window.localStorage.removeItem('token'); }}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
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
