/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form, Container, Row, Col, Button, Card,
} from 'react-bootstrap';
import { activateAccommodation } from '../../actions/accommodationActions';
import Breadcrumbs from '../global/Breadcrumbs';
import AlertComponent from '../global/AlertComponent';

export class ActivateDeactivateAccommodation extends Component {
  state = {
    isLoading: false,
    reasons: '',
  };

  handleChange = (e) => {
    const { name, value, history } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { props, state } = this;
    const { slug, history } = props;

    this.setState({ isLoading: true });
    const { reasons } = this.state;
    await props.activateAccommodation(slug, reasons);
    this.setState({ isLoading: false });
  };

  renderCardText = (isLoading, activateAccommodationError, location) => (
    <Card.Text>
      <Form id="accommodation-form" onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Reasons</Form.Label>
          <Form.Control
            type="text"
            name="reasons"
            onChange={this.handleChange}
            placeholder="Reasons..."
            title="Enter the reasons"
            className="form-change"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="full-width-buttons">
          {isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : location.state.action}
        </Button>
      </Form>
      <Row>
          <Col>
            {activateAccommodationError && <AlertComponent variant="danger" message={activateAccommodationError.error[0]} />}
          </Col>
      </Row>
    </Card.Text>
  );

  render() {
    const { isLoading, reasons } = this.state;
    const {
      activateAccommodationError, activateAccommodationData, status, slug, location,
    } = this.props;
    return (

      <div className="create-accommodation">
        <Container>
          <Row>
            <Col className="breadcrumbs">
              <Breadcrumbs itemsArray={['> Home', 'Accommodations', 'Activate/Deactivate']} />
            </Col>
          </Row>
          <Card style={{ margin: '10px 0' }}>
            <Card.Body>
              <Card.Title>Activate/Deactivate Accommodation</Card.Title>
              {this.renderCardText(isLoading, activateAccommodationError, location)}
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

ActivateDeactivateAccommodation.propTypes = {
  activateAccommodationData: PropTypes.func,
  activateAccommodationError: PropTypes.object,
  accommodationData: PropTypes.object,
  accommodationError: PropTypes.object,
  status: PropTypes.string,
  history: PropTypes.object,
  activateAccommodation: PropTypes.object,
};

const mapStateToProps = (state) => ({
  accommodationData: state.accommodation.accommodationData,
  accommodationError: state.accommodation.accommodationError,
  activateAccommodationData: state.accommodation.activateAccommodationData,
  activateAccommodationError: state.accommodation.activateAccommodationError,
  status: state.accommodation.status,
});

export default withRouter(connect(mapStateToProps, { activateAccommodation })(ActivateDeactivateAccommodation));
