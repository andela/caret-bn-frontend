/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import {
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Add, Send } from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';
import { sendRequest } from '../../actions/requestActions';
import { getBookings } from '../../actions/bookingActions';
import { getLocations } from '../../actions/locationActions';
import BreadCrumbs from '../../components/global/Breadcrumbs';
import PageLoading from '../../components/global/PageLoading';
import Destination from '../../components/requests/Destination';
import AlertComponent from '../../components/global/AlertComponent';
import isEmpty from '../../utilities/EmptyFields';

class CreateRequests extends Component {
  state = {
    disablePlaceRequest: true,
    disableAddDestination: true,
    disableReturnDate: true,
    destinationComponents: [],
    loadingActive: true,
    error: {
      hasError: false,
      type: null,
      message: null,
    },
    request: {
      typeId: null,
      locationId: null,
      departureDate: null,
      returnDate: null,
      destinations: [],
    },
  }

  componentDidMount = () => {
    const { bookings, getBookings, getLocations } = this.props;
    getBookings();
    getLocations();
  }

  placeRequest = () => {
    window.scrollTo(0, 0);
    const { sendRequest } = this.props;
    const { request } = this.state;
    const requestCopy = { ...request };
    if (isEmpty(requestCopy.returnDate)) {
      delete requestCopy.returnDate;
    }

    const { destinations } = this.state.request;

    const today = new Date();

    if (new Date(request.departureDate) <= today) {
      this.setState({
        error: {
          hasError: true,
          type: 'Validation Error',
          message: `Departure date must be greater than today ${today}`,
        },
      });
    }

    requestCopy.destinations.map((destination) => {
      if (isEmpty(destination.departureDate)) {
        delete destination.departureDate;
      }
    });

    // Testing Destinations
    const len = destinations.length;

    const testArray = destinations.map((destination) => {
      if (destination.isFinal === true) {
        return true;
      }
    });

    const resultCount = testArray.filter((result) => result === true);

    if (resultCount.length === 0) {
      this.setState({
        error: {
          hasError: true,
          type: 'Validation Error',
          message: 'You need to set a destination as final',
        },
      });
    } else if (destinations[len - 1].isFinal !== true) {
      this.setState({
        error: {
          hasError: true,
          type: 'Validation Error',
          message: 'You need to set your final entered destination as final',
        },
      });
    } else if (resultCount.length > 1) {
      this.setState({
        error: {
          hasError: true,
          type: 'Validation Error',
          message: 'Cannot set multiple destinations as final',
        },
      });
    } else {
      sendRequest(requestCopy);
      this.setState({
        error: {
          hasError: false,
          type: '',
          message: '',
        },
      });
    }

    sendRequest(requestCopy);
  }

  validateInput = async () => {
    const {
      typeId, locationId, departureDate, returnDate, destinations,
    } = this.state.request;
    if (typeId === 1) {
      this.setState({
        disableReturnDate: true,
      });
    } else {
      this.setState({
        disableReturnDate: false,
      });
    }

    // Check if necessary feilds have been inputted

    const mandetoryOneWay = (!isEmpty(locationId) && !isEmpty(departureDate));
    const mandetoryReturn = (mandetoryOneWay && !isEmpty(returnDate));
    const mandetoryMultiCity = mandetoryOneWay;

    // Check if mandetory fields are filled
    if (mandetoryOneWay && typeId === 1) {
      this.setState({
        disableAddDestination: false,
      });
    }

    if (typeId === 2 && mandetoryReturn) {
      this.setState({
        disableAddDestination: false,
      });
    }

    if (typeId === 3 && mandetoryMultiCity) {
      this.setState({
        disableAddDestination: false,
      });
    }

    const singleDestinationRequest = (typeId === 1 || typeId === 2);
    if (singleDestinationRequest && this.state.request.destinations.length > 1) {
      await this.setState({
        disablePlaceRequest: true,
        disableAddDestination: true,
        error: {
          hasError: true,
          type: 'Validation Error',
          message: 'You cannot add more than one destination with this trip type',
        },
      });
    }
  }

  addDestination = async () => {
    const { request } = this.state;
    const { typeId, destinations } = request;
    const singleDestinationRequest = (typeId === 1 || typeId === 2);

    const key = destinations.length + 1;

    const destinationBuild = {
      locationId: null,
      arrivalDate: null,
      departureDate: null,
      reasons: '',
      bookingId: '',
      isFinal: false,
    };

    const destinationComponent = (
      <Destination
        key={key}
        position={key - 1}
        bookings={this.props.bookings.data}
        locations={this.props.locations.data}
        handleChange={this.handleDestinationChange}
        removeDestination={this.removeDestination}
        finalMarking={this.finalMarking}
      />
    );

    await this.setState((prevState) => ({
      request: {
        ...prevState.request,
        destinations: request.destinations.concat(destinationBuild),
      },
    }));

    await this.setState({
      destinationComponents: this.state.destinationComponents.concat(destinationComponent),
    });

    if (!singleDestinationRequest && this.state.request.destinations.length > 1) {
      await this.setState({
        disablePlaceRequest: false,
      });
    } else if (singleDestinationRequest && this.state.request.destinations.length === 1) {
      await this.setState({
        disablePlaceRequest: false,
        disableAddDestination: true,
      });
    }
  }

  handleDestinationChange = async (e) => {
    const { name } = e.target;
    let { value } = e.target;
    const key = e.target.getAttribute('data-tag');
    if (!isNaN(value)) {
      value = parseInt(value);
    }
    const copiedState = { ...this.state.request };
    copiedState.destinations[key][name] = value;
    this.setState({
      request: copiedState,
    });

    const filteredComponents = this.state.destinationComponents.filter((destination) => parseInt(destination.position) !== key);
    this.setState({ destinationComponents: filteredComponents });
  }

  removeDestination = async (key) => {
    const copiedState = { ...this.state.request };
    const destinationComponentState = [...this.state.destinationComponents];
    copiedState.destinations.splice(key, 1);
    const filteredComponents = destinationComponentState.filter((destination) => destination.props.position !== parseInt(key));
    await this.setState({
      request: copiedState,
      destinationComponents: filteredComponents,
    });
  }

  finalMarking = async (position) => {
    const { request } = this.state;
    const copiedState = { ...request };
    copiedState.destinations[position].isFinal = !copiedState.destinations[position].isFinal;
    this.setState({
      request: copiedState,
    });
  }

  handleChange = async (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (!isNaN(value)) {
      value = parseInt(value);
    }
    await this.setState((prevState) => ({
      request: {
        ...prevState.request,
        [name]: value,
      },
    }));
    this.validateInput();
  }

  render() {
    const { requestState, locations, bookings } = this.props;

    if (locations.data !== null && bookings.data !== null) {
      return (
        <Container fluid className="edit-form">
          <Row>
            <BreadCrumbs itemsArray={['Home', 'Requests', 'Create']} />
          </Row>
          <Row className="error-holder">
            {
              (this.state.error.hasError)
                ? <AlertComponent variant="danger" message={this.state.error.message} heading={this.state.error.type} dismissible />
                : (requestState.status === 'error')
                  ? <AlertComponent variant="danger" message={(requestState.dataError.data.error ? requestState.dataError.data.error : requestState.dataError.data.message)} heading="Could not place your request" />
                  : (requestState.status === 'success')
                    ? <Redirect to="/requests" />
                    : ''
            }
          </Row>

          <Row className="section">
            <h4>Basic Information</h4>
            <p>Tell us what we need to know to help you get started.</p>
            <div />
          </Row>
          <Row className="center-items">
            <Col xs={12} sm={12} md={2} lg={3}>
              <Form.Group>
                <Form.Label>Trip Type</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} name="typeId" data-test="type-id">
                  <option>--</option>
                  <option value={1}>One Way Trip</option>
                  <option value={2}>Return Trip</option>
                  <option value={3}>Multi City Trip</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={2} lg={3}>
              <Form.Group>
                <Form.Label>Origin</Form.Label>
                <Form.Control as="select" name="locationId" onChange={this.handleChange} data-test="location-id">
                  <option>--</option>
                  {locations.data.data.map((location) => (<option value={location.id} key={location.id}>{location.name}</option>))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={2} lg={3}>
              <Form.Group>
                <Form.Label>Departure Date</Form.Label>
                <Form.Control as="input" type="date" name="departureDate" onChange={this.handleChange} data-test="departure-date" />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={2} lg={3}>
              <Form.Group>
                <Form.Label>Return Date</Form.Label>
                <Form.Control as="input" type="date" name="returnDate" onChange={this.handleChange} disabled={this.state.disableReturnDate} data-test="return-date" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="section">
            <h4>Destinations</h4>
            <p>Please add all locations you will be visiting during your trip.</p>
          </Row>
          <Row className="center-items">
            {this.state.destinationComponents}
          </Row>
          <Row className="space-horizontal">
            <Button className="full-width-buttons" onClick={() => this.addDestination()} onChange={this.handleChange} disabled={this.state.disableAddDestination} data-test="add-destination">
              <Add />
              Include New Destination
            </Button>

            <Button className="full-width-buttons" disabled={this.state.disablePlaceRequest} onClick={() => this.placeRequest()} data-test="place-request">
              <Send />
              Place Request
            </Button>
          </Row>
        </Container>
      );
    }

    if (locations.dataError !== null || bookings.dataError !== null) {
      const { dataError } = locations || bookings;
      return (
        <div className="loading-componenent">
          <img src={error} alt="I think something's broken" />
          <p>
            Something went wrong, we think. Tell us what it says:
{' '}
            {dataError}
          </p>
        </div>
      );
    }
    return (
      <PageLoading data-test="loading-component" />
    );
  }
}

const mapStateToProps = (state) => ({
  requestState: state.request,
  bookings: state.bookings,
  locations: state.locations,
});

export default connect(mapStateToProps, { sendRequest, getBookings, getLocations })(CreateRequests);
