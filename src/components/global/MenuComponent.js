import React, { Component } from 'react';
import {
  Navbar, Nav, Dropdown, NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Notifications, AccountCircle,
  ExitToApp, FileCopy, HomeOutlined,
} from '@material-ui/icons';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AirlineSeatFlatAngled from '@material-ui/icons/AirlineSeatFlatAngled';
import GroupIcon from '@material-ui/icons/Group';
import barefootLogo from '../../assets/images/foot-print.png';
import { GetUserProfile } from '../../actions/profileAction';
import authHelper from '../../helpers/authHelper';

const { checkSupplier, checkAdmin, checkManager } = authHelper;

export class MenuComponent extends Component {
    state = {
      username: '',
    };

    async componentDidMount() {
      const { props } = this;
      await props.GetUserProfile();
    }

    render() {
      const { props } = this;
      const { data, pathname } = props;
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
                            My Requests
                        </div>
                      )}
                </Link>
                <Link to="/user-manager">
                    {checkManager() ? null
                      : (
                        <div className="account-icon">
                          <AssignmentIndIcon className="icon" />
                          Manage Requests
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
                <Link to="/profile">
                    <div className="account-icon dropdown">
                        <img src={(data && data.profile) && (data.profile.image)} className="icon menu-photo"  />
                <NavDropdown className="nav-drop mr-3" title={(data && data.profile) && (data.profile.username)} id="basic-nav-dropdown" alignRight>
                    <NavDropdown.Item class="dropdown-item" href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/login" onClick={() => { window.localStorage.removeItem('token'); }}>Logout</NavDropdown.Item>
                </NavDropdown>
                    </div>
                </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
      }
      return null;
    }
}

MenuComponent.propTypes = {
  pathname: PropTypes.string,
  GetUserProfile: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  data: state.profile.data,
});

export default connect(mapStateToProps, { GetUserProfile })(MenuComponent);
