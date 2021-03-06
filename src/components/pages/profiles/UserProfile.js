/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import FormData from 'form-data';
import { connect } from 'react-redux';
import {
  Row, Button, Col, Spinner,
} from 'react-bootstrap';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import Breadcrumbs from '../../global/Breadcrumbs';
import AlertComponent from '../../global/AlertComponent';
import { GetUserProfile, UpdateUserProfile } from '../../../actions/profileAction';
import { switchNotifAction } from '../../../actions/notificationsActions';
import { hideAlert } from '../../../actions/alertAction';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReadOnly: true,
      isDisabled: true,
      username: '',
      gender: '',
      phone: '',
      language: '',
      country: '',
      company: '',
      department: '',
      isLoading: false,
      selectedFile: '',
      status: 'display',
      emailNotif: false,
      appNotif: false,
    };
    this.changeEditMode = this.changeEditMode.bind(this);
  }

  componentDidMount = async () => {
    document.title = 'Barefoot Nomad - Profile';
    const { props } = this;
    const { hideAlert } = this.props;
    await hideAlert();
    await props.GetUserProfile();
    const { data } = this.props;
    const {
      username, email, gender, phone, language, country, company, department, image, emailNotif, appNotif,
    } = data.profile;

    this.setState({
      username,
      email,
      gender,
      phone,
      language,
      country,
      company,
      department,
      image,
      isLoading: false,
      emailNotif,
      appNotif,
    });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      if (data.message === 'User profile updated successfully') {
        this.setState({
          ...data.data, isLoading: false, status: 'display', isDisabled: true, isReadOnly: true,
        });
      }
    }
  }

  changeEditMode = (e) => {
    e.preventDefault();
    this.setState({
      isLoading: false, isReadOnly: false, isDisabled: false, status: 'edit',
    });
  };

  handleCancel = async (e) => {
    e.preventDefault();
    this.setState({
      isLoading: false, status: 'display', isDisabled: true, isReadOnly: true,
    });
    await this.componentDidMount();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleImage = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  }

  handleSubmit = async (e) => {
    const { props } = this;
    e.preventDefault();
    const {
      username, email, gender, phone, language, country, company, department, selectedFile,
    } = this.state;
    const userData = {
      username, gender, phone, language, country, company, department,
    };
    this.setState((state) => ({ ...state, isLoading: true }));
    const form = new FormData();
    if (selectedFile) {
      form.append('image', selectedFile);
    }
    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        form.append(key, userData[key]);
      }
    }
    await props.UpdateUserProfile(form);
    this.setState((state) => ({ ...state, isLoading: false }));
    await props.GetUserProfile();
  };

  switchNotif = async (switchParam) => {
    const { props } = this;
    const { data } = props;

    this.setState({ isLoading: true });

    await props.switchNotifAction(switchParam);
    await props.GetUserProfile();

    const {
      emailNotif, appNotif,
    } = data.profile;

    this.setState({
      isLoading: false,
      emailNotif,
      appNotif,
    });
  };

  render() {
    const { props } = this;
    const {
      isLoading, image, email, username, gender, phone, language, country, company, department, selectedFile, isReadOnly, isDisabled, status, emailNotif, appNotif,
    } = this.state;

    const { data, dataError, statesss } = props;

    return (
      <div className="user-profile">
      <Row>
        <Col md={5} className="breadcrumbs">
          <Breadcrumbs itemsArray={['> Home', '  Profile']} />
        </Col>
      </Row>
        {isLoading ? (
          <div className="d-flex justify-content-center">
                  <Spinner animation="grow" size="lg" variant="primary" />
          </div>
        ) : ''}
      {
        data
        && (
        <Row className="center-items">
          <form data-test="form" className="text-center bg-white py-3 rounded" onSubmit={this.handleSubmit}>
            <div className="prof-container">
                <img id="profile-picture" className="avatar mb-5 center-image-small-screen" src={image || 'https://via.placeholder.com/450'} alt="profile" />
                <div className="button-wrapper">
                <span className="label">
                  <i className="fa fa-camera" />
                </span>
                  <input type="file" data-test="image" name="upload" id="upload" name="selectedFile" onChange={this.handleImage} className="upload-box" disabled={isDisabled} />
                </div>
            <div className="form-group row p-1 pb-0">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">User Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" name="username" placeholder="username" required value={username} onChange={this.handleChange} readOnly={isReadOnly} />
                </div>
            </div>
            <div className="form-group row p-1">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="email" placeholder="Email" value={email} disabled />
              </div>
            </div>
            <div className="form-group row p-1">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Gender</label>
              <div className="col-sm-10">
              <select className="form-control mb-2" name="gender" onChange={this.handleChange} disabled={isDisabled} value={gender}>
                  <option selected>select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
              </select>
              </div>
            </div>
            <div className="form-group row p-1">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Language</label>
              <div className="col-sm-10">
                <input type="text" data-test="language" className="form-control mb-2" name="language" placeholder="language" value={language} onChange={this.handleChange} readOnly={isReadOnly} />
              </div>
            </div>
            <div className="form-group row p-1">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Phone</label>
              <div className="col-sm-10">
                <input type="number" className="form-control mb-2" name="phone" placeholder="phone" minLength="3" maxLength="10" value={phone} onChange={this.handleChange} readOnly={isReadOnly} />
              </div>
            </div>
            <div className="form-group row p-1">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Country</label>
              <div className="col-sm-10">
                <input type="text" className="form-control mb-2" name="country" placeholder="country" value={country} onChange={this.handleChange} readOnly={isReadOnly} />
              </div>
            </div>
            <div className="form-group row p-1">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Company</label>
              <div className="col-sm-10">
                <input type="text" className="form-control mb-2" name="company" placeholder="company" value={company} disabled />
              </div>
            </div>
            <div className="form-group row p-1">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Department</label>
              <div className="col-sm-10">
              <select className="form-control mb-2" name="department" onChange={this.handleChange} disabled={isDisabled} value={department}>
                  <option value="IT">IT</option>
                  <option value="People">PEOPLE</option>
                  <option value="OPERATION">OPERATION</option>
                  <option value="SOFTWARE ENGINEERING">SOFTWARE ENGINEERING</option>
              </select>
              </div>
            </div>
            <div className="form-group row p-1">
              <span className="col-sm-6 col-form-label">
                Email Notifications:
              {' '}
                <Switch data-test="email-switch" onChange={() => this.switchNotif('email-notification')} checked={(data && data.profile) ? data.profile.emailNotif : emailNotif} />
              </span>
              <span className="col-sm-6 col-form-label">
                In-app Notifications:
              {' '}
                <Switch data-test="app-switch" onChange={() => this.switchNotif('app-notification')} checked={(data && data.profile) ? data.profile.appNotif : appNotif} />
              </span>
            </div>
            <Row>
              <Col>
                { dataError && <AlertComponent variant="danger" message={dataError.data.error[0]} /> }
              </Col>
            </Row>
            </div>
            {status === 'display'
              ? (
              <Button variant="primary" data-test="edit-mode" className="style-btn-update" onClick={this.changeEditMode} id="buttonEdit">
                Edit Profile
              </Button>
              )
              : (
                <div>
                  <Button variant="primary" type="submit" className="style-btn-update mx-1">
                    {isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'Update'}
                  </Button>
                  {!isLoading ? <Button data-test="cancel" variant="primary" type="reset" className="style-btn-update mx-1" onClick={this.handleCancel} id="buttonCancel"> Cancel </Button> : null }
                </div>
              )}
          </form>
        </Row>
        )
        }
      </div>
    );
  }
}
UserProfile.propTypes = {
  GetUserProfile: PropTypes.func.isRequired,
  UpdateUserProfile: PropTypes.func.isRequired,
  switchNotifAction: PropTypes.func.isRequired,
  data: PropTypes.object,
  dataError: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataError: state.profile.dataError,
  data: state.profile.data,
  statesss: state,
});

export default connect(mapStateToProps, {
  GetUserProfile, UpdateUserProfile, switchNotifAction, hideAlert,
})(UserProfile);
