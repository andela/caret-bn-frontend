/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Card, Button, Row, Col, Spinner,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getUsers } from '../../../actions/userActions';
import Breadcrumbs from '../../global/Breadcrumbs';

export class ViewUsers extends Component {
  state = {
    isLoading: false,
  }

  async componentDidMount() {
    const { getUsers: getAllUsers } = this.props;
    this.setState({ isLoading: true });
    await getAllUsers();
    this.setState({ isLoading: false });
  }

  render() {
    document.title = 'Barefoot Nomad - Admin';
    const { allUserData } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <Row>
      <Col md={3} className="breadcrumbs">
        <Breadcrumbs itemsArray={['> Admin', 'Users', 'All users']} />
      </Col>
        </Row>
            { isLoading ? (
            <div className="d-flex justify-content-center">
                    <Spinner animation="grow" size="lg" variant="primary" />
            </div>
            ) : '' }
            <div className="view-all-users">
              {
                allUserData ? allUserData.data.map((user) => (
                  <div>
                    <Card border="light" text="black" className="user-info-card">
                    <Card.Header className="card-header"><h5>{user.username}</h5></Card.Header>
                      <Card.Body>
                        <Card.Title className="card-title">{`Role: ${user.Role.name}`}</Card.Title>
                        <Card.Text>
                          <p>{user.email || 'N/A'}</p>
                          <p>{` phone: ${user.phone}` || 'N/A'}</p>
                        </Card.Text>
                        <Link to={`/admin/users/${user.id}`}>
                        <Button>
                          <VisibilityIcon />
                              {' '}
                          View user
                        </Button>
                        </Link>

                      </Card.Body>
                    </Card>
                  </div>
                )) : null
              }
            </div>
      </div>

    );
  }
}

ViewUsers.propTypes = {
  getUsers: PropTypes.func,
  allUserData: PropTypes.array,
};

const mapStateToProps = (state) => ({
  allUserData: state.user.allUserData,
  allUserError: state.user.userError,
  status: state.user.status,
});

export default compose(withRouter, connect(mapStateToProps, { getUsers }))(ViewUsers);
