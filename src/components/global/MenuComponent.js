import React, { Component } from 'react';
import {
  Navbar, Nav, Dropdown, NavDropdown,
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Notifications, FileCopy, HomeOutlined, LocalHotel, BookmarkTwoTone, BookmarksTwoTone,
} from '@material-ui/icons';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AirlineSeatFlatAngled from '@material-ui/icons/AirlineSeatFlatAngled';
import GroupIcon from '@material-ui/icons/Group';
import barefootLogo from '../../assets/images/foot-print.png';
import { GetUserProfile } from '../../actions/profileAction';
import { getNotifsAction, markAllNotifAction, markOneNotifAction } from '../../actions/notificationsActions';
import authHelper from '../../helpers/authHelper';

const { checkSupplier, checkAdmin, checkManager } = authHelper;

export class MenuComponent extends Component {
  state = {
    username: '',
  };

  async componentDidMount() {
    const { props } = this;
    await props.GetUserProfile();
    await props.getNotifsAction();
  }

  markAllNotifs = async () => {
    const { props } = this;
    await props.markAllNotifAction('read');
    await props.getNotifsAction();
  }

  markLink = async (notif) => {
    const { props } = this;
    if (!notif.isRead) {
      await props.markOneNotifAction(notif.id);
      await props.getNotifsAction();
    }
  };

  render() {
    const { props } = this;
    const { data, pathname, notifsData } = props;
    const urls = ['/login', '/register', '/forgotpassword', '/registered'];
    const displayMenu = !(urls.includes(pathname) || pathname.match(/resetpassword/) || pathname.match(/verify/));
    let unreadNotifs = 0;

    if (notifsData) {
      unreadNotifs = notifsData.filter((notif) => !notif.isRead).length;
    }

    if (displayMenu) {
      return (
        <>
          <Navbar fixed="top" data-test="menu-test" bg="primary" variant="dark" expand="lg" className="top-navbar">
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

                <Link to="/bookings/pending">
                  {checkSupplier() ? (
                    <div className="account-icon">
                      <LocalHotel className="icon" />
                      Bookings
                    </div>
                  )
                    : <Redirect to="/" />}
                </Link>

                <Link className="nav-links" to="/my-bookings">
                  {!checkSupplier() ? (
                    <div className="account-icon">
                      <LocalHotel className="icon" />
                      My Bookings
                    </div>
                  )
                    : <Redirect to="/" />}
                </Link>

                <Link className="nav-links" to="/my-bookmarks">
                  {!checkSupplier() ? (
                    <div className="account-icon">
                      <BookmarksTwoTone className="icon" />
                      My Bookmarks
                    </div>
                  )
                    : <Redirect to="/" />}
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
                <Link to="/notifications">
                  <div className="account-icon">
                    <span>
                      <Notifications className="icon" />
                      {unreadNotifs === 0 ? null : (<span className="notif-number">{unreadNotifs}</span>)}
                    </span>
                    {/* Notifications */}
                    <NavDropdown className="nav-drop nav-drop-notif" title="Notifications" id="basic-nav-dropdown" alignRight>
                      {unreadNotifs === 0 && <NavDropdown.Item className="dropdown-item">No new notifications!</NavDropdown.Item>}
                      {unreadNotifs > 0 && (
                        <>
                          <NavDropdown.Item data-test="mark-all-click" className="dropdown-item text-primary font-weight-bold text-right" onClick={() => this.markAllNotifs()}><u>Mark All as Read</u></NavDropdown.Item>
                          <NavDropdown.Divider />
                          {notifsData && notifsData.sort((recent, old) => moment(`${old.createdAt}`) - moment(`${recent.createdAt}`)).slice(0, 10).filter((notif) => !notif.isRead).map((notif) => (
                            <NavDropdown.Item key={notif.id} className="dropdown-item font-weight-bold">
                              {notif.activity.substring(0, notif.activity.indexOf('.'))}
                              {'.'}
                              <br />
                              <u>
                                <Link data-test="link-click" className="text-underline" to={`/${notif.entity}s/${notif.entityId}`} onClick={() => this.markLink(notif)}>
                                  View
                                  {' '}
                                  {notif.entity}
                                </Link>
                              </u>
                              <small className="text-muted float-right text-lowercase">
                                {moment(`${notif.createdAt}`).fromNow()}
                              </small>
                            </NavDropdown.Item>
                          ))}
                        </>
                      )}
                      <NavDropdown.Divider />
                      <NavDropdown.Item className="text-primary text-center ">
                        <Link className="font-weight-bold" to="/notifications">
                          <u>View All</u>
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </Link>
                <Link to="/profile">
                  <div className="account-icon dropdown">
                    <img src={(data && data.profile) && (data.profile.image)} className="icon menu-photo" />
                    <NavDropdown className="nav-drop mr-3" title={(data && data.profile) && (data.profile.username)} id="basic-nav-dropdown" alignRight>
                      <NavDropdown.Item className="dropdown-item" href="/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/login" onClick={() => { window.localStorage.removeItem('token'); }}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div style={{ marginBottom: '100px' }} />
        </>
      );
    }
    return null;
  }
}

MenuComponent.propTypes = {
  pathname: PropTypes.string,
  notifsData: PropTypes.any,
  GetUserProfile: PropTypes.func.isRequired,
  getNotifsAction: PropTypes.func.isRequired,
  markAllNotifAction: PropTypes.func.isRequired,
  markOneNotifAction: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  data: state.profile.data,
  notifsData: state.allNotifs.notifsData,
  notifsDataError: state.allNotifs.notifsDataError,
});

export default connect(mapStateToProps, {
  GetUserProfile, getNotifsAction, markAllNotifAction, markOneNotifAction,
})(MenuComponent);
