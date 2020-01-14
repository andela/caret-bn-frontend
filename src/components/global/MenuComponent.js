/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-globals */
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
import authHelper, { checkHost } from '../../helpers/authHelper';
import initSocketNotif from '../../helpers/socketNotif';

const { checkSupplier, checkAdmin, checkManager } = authHelper;

export class MenuComponent extends Component {
  state = {
    navExpanded: false,
  };

  async componentDidMount() {
    initSocketNotif();
    const { props } = this;
    await props.GetUserProfile();
    await props.getNotifsAction();
  }

  toggleExpanded = () => ((innerWidth < 1024)
    ? this.setState({
      navExpanded: !this.state.navExpanded,
    }) : null)

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
    const { props, state: { navExpanded } } = this;
    const { data, pathname, notifsData } = props;
    const urls = ['/login', '/register', '/forgotpassword', '/registered'];
    const displayMenu = !(urls.includes(pathname) || pathname.match(/resetpassword/) || pathname.match(/verify/));
    let unreadNotifs = 0;

    if (notifsData) {
      unreadNotifs = notifsData.filter((notif) => !notif.isRead).length;
    }

    const links = [{
      path: '/',
      icon: <HomeOutlined className="icon" />,
      label: 'Home',
      midlleware: () => true,
      id: 1,
    },
    {
      path: '/admin/users',
      icon: <GroupIcon className="icon" />,
      label: 'Users',
      midlleware: checkAdmin(),
      id: 2,
    },
    {
      path: '/requests',
      icon: <FileCopy className="icon" />,
      label: 'My Requests',
      midlleware: !checkSupplier(),
      id: 3,
    },
    {
      path: '/bookings/pending',
      icon: <LocalHotel className="icon" />,
      label: 'Bookings',
      midlleware: checkSupplier(),
      id: 4,
    },
    {
      path: '/my-bookings',
      icon: <LocalHotel className="icon" />,
      label: 'My Bookings',
      midlleware: !checkSupplier(),
      id: 5,
    },
    {
      path: '/my-bookmarks',
      icon: <BookmarksTwoTone className="icon" />,
      label: 'My Bookmarks',
      midlleware: !checkSupplier(),
      id: 6,
    },
    {
      path: '/user-manager',
      icon: <AssignmentIndIcon className="icon" />,
      label: 'Manage Requests',
      midlleware: !checkManager(),
      id: 7,
    },
    {
      path: '/accommodations',
      icon: <AirlineSeatFlatAngled className="icon" />,
      label: 'Accommodations',
      midlleware: () => true(),
      id: 8,
    }];

    const menuBar = (
      <div className="nav-container">
        <Navbar
          fixed="top"
          data-test="menu-test"
          bg="primary"
          variant="dark"
          expand="lg"
          className="top-navbar"
          expanded={navExpanded}
          onToggle={this.toggleExpanded}
        >
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
              {
                links.map((link) => {
                  if (link.midlleware) {
                    return (
                      <Link to={link.path} key={link.id} onClick={this.toggleExpanded}>
                        <div className="account-icon">
                          {link.icon}
                          <span>{link.label}</span>
                        </div>
                      </Link>
                    );
                  }
                })
              }
              <Link to="/notifications">
                <div className="account-icon">
                  <span>
                    <Notifications className="icon" />
                    {unreadNotifs === 0 ? null : (<span className="notif-number">{unreadNotifs}</span>)}
                  </span>
                  <NavDropdown className="nav-drop nav-drop-notif space" title="Notifications" id="basic-nav-dropdown" alignRight>
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
                              <Link
                                data-test="link-click"
                                className="text-underline"
                                to={`/${notif.entity}s/${notif.entityId}`}
                                onClick={() => {
                                  this.toggleExpanded();
                                  this.markLink(notif);
                                }}
                              >
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
                      <Link className="font-weight-bold" to="/notifications" onClick={this.toggleExpanded}>
                        <u>View All</u>
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Link>
              <Link to="/profile">
                <div className="account-icon dropdown">
                  <span>
                    <img src={(data && data.profile) && (data.profile.image)} className="icon menu-photo" />
                  </span>
                  <NavDropdown className="nav-drop nav-drop-notif space" title={(data && data.profile) && (data.profile.username)} id="basic-nav-dropdown" alignRight>
                    <NavDropdown.Item className="dropdown-item" href="/profile" onClick={this.toggleExpanded}>Profile</NavDropdown.Item>
                    {checkHost() ? null : <NavDropdown.Item><Link to="/community" onClick={this.toggleExpanded}>Community Chat</Link></NavDropdown.Item>}
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/login" onClick={() => { window.localStorage.removeItem('token'); }}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
    return (displayMenu) ? menuBar : null;
  }
}

MenuComponent.propTypes = {
  pathname: PropTypes.string,
  notifsData: PropTypes.any,
  data: PropTypes.any,
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
