/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card, Button, Row, Container, Form,
} from 'react-bootstrap';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { getSpecificUser } from '../../../actions/userActions';
import { getRoles, assignRole } from '../../../actions/roleActions';
import { hideAlert } from '../../../actions/alertAction';
import AlertComponent from '../../global/AlertComponent';

export class ViewSpecificUser extends Component {
  state = {
    isLoading: false,
    isLoadingButton: false,
    Role: '',
  }

  async componentDidMount() {
    const { getSpecificUser: getOneUser, userId, getRoles: fetchRoles } = this.props;
    await hideAlert();
    this.setState({ isLoading: true });
    await getOneUser(userId);
    this.setState({ isLoading: false });
    fetchRoles();
  }

  async componentWillUnmount() {
    const { hideAlert } = this.props;
    await hideAlert();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    const { Role } = this.state;
    const { assignRole: assignNewRole, userId, getSpecificUser: getOneUser } = this.props;
    e.preventDefault();
    this.setState({ isLoadingButton: true });
    await assignNewRole(userId, Role);
    getOneUser(userId);
    this.setState({ isLoadingButton: false });
  }

  render() {
    const { isLoading, isLoadingButton } = this.state;
    const {
      userData, roleData, assignedRoleError, assignedRoleData,
    } = this.props;
    const { data } = userData || {};
    return (
      <div className="view-specific-user">
        <Container className="user-view">
          <Row>
            {isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : ''}
          </Row>
          {data && (
            <Card border="light" text="black" className="user-card">
              {assignedRoleError && <AlertComponent variant="danger" heading="Error" message={(assignedRoleError.data.error) ? 'Please select the new role to assign to the user' : assignedRoleError.data.message} />}
              {assignedRoleData && <AlertComponent variant="success" heading="Success" message={assignedRoleData.message} />}
              <Card.Header className="card-header"><h5>{`Username: ${data.username}`}</h5></Card.Header>
              <Card.Body>
                <Card.Title className="card-title">{`Role: ${data.Role.name}`}</Card.Title>
                <Card.Text>
                      <p>{`email: ${data.email}`}</p>
                      <p>{`Firstname: ${data.firstName}`}</p>
                      <p>{`Lastname: ${data.lastName}`}</p>
                      <p>{`Genger: ${data.gender}`}</p>
                      <p>{`Phone number: ${data.phone}`}</p>
                      <p>{`Date of birth: ${data.dob}`}</p>
                      <p>{`Country: ${data.country}`}</p>
                      <p>{`Company: ${data.company}`}</p>
                      <p>{`Department: ${data.department}`}</p>
                      <p>{`Currency: ${data.currency}`}</p>
                </Card.Text>
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control id="select-role" as="select" name="Role" onChange={this.handleChange} required>
                          <option selected disabled>Select new role</option>
                          {
                            roleData ? roleData.data.map((role) => <option value={role.name}>{role.name}</option>) : null
                          }

                        </Form.Control>
                      </Form.Group>
                  </Row>
                          <Row>
                      <Button type="submit">
                        <AssignmentTurnedInIcon />
                        {' '}
                        {isLoadingButton ? <i className="fas fa-spinner fa-pulse loader-small" /> : 'Assign new Role'}
                      </Button>
                          </Row>
                </Form>

              </Card.Body>
            </Card>
          )}
        </Container>

      </div>
    );
  }
}

ViewSpecificUser.propTypes = {
  getSpecificUser: PropTypes.func,
  userId: PropTypes.string,
  userData: PropTypes.object,
  roleData: PropTypes.array,
  assignRole: PropTypes.func,
  getRoles: PropTypes.func,
  assignedRoleError: PropTypes.object,
  assignedRoleData: PropTypes.object,
  hideAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  userError: state.user.userError,
  status: state.user.status,
  roleData: state.role.roleData,
  assignedRoleData: state.role.assignedRoleData,
  assignedRoleError: state.role.assignedRoleError,
  assignedRoleStatus: state.role.assignedRoleStatus,
});

export default compose(withRouter, connect(mapStateToProps, {
  getSpecificUser, assignRole, getRoles, hideAlert,
}))(ViewSpecificUser);
