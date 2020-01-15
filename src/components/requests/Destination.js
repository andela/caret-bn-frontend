import React, { Component } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { IconButton, Checkbox } from '@material-ui/core';
import { Delete, DoneAll } from '@material-ui/icons';

// eslint-disable-next-line react/prefer-stateless-function
export default class Destination extends Component {
  render() {
    const {
      locations, position, handleChange, bookings, removeDestination, finalMarking,
    } = this.props;
    return (
      <span className="destination-wrapper">
        <Col xs={12} sm={12} md={2} lg={3}>
          <Form.Group>
            <Form.Label>Destination Name:</Form.Label>
            <Form.Control as="select" onChange={handleChange} data-tag={position} data-test="location-id" name="locationId">
              <option>--</option>

              {locations.data.map((locale) => (<option value={locale.id} key={locale.id}>{locale.name}</option>))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={2} lg={3}>
          <Form.Group>
            <Form.Label>Arrival Date</Form.Label>
            <Form.Control as="input" type="date" data-tag={position} data-test="arrivalDate" name="arrivalDate" onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={2} lg={3}>
          <Form.Group>
            <Form.Label>Departure Date</Form.Label>
            <Form.Control as="input" type="date" data-tag={position} data-test="departureDate" name="departureDate" onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={2} lg={3}>
          <Form.Group>
            <Form.Label>Select Booking</Form.Label>
            <Form.Control as="select" onChange={handleChange} data-tag={position} data-test="bookingId" name="bookingId">
              <option>--</option>
              {bookings.data.map((booking) => {
                if (booking.status.name === 'Approved') {
                  return (<option value={parseInt(booking.id)} key={booking.id}>{`${booking.accommodation.name} - ${booking.checkIn}`}</option>);
                }
              })}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={2} lg={3}>
          <Form.Group>
            <Form.Label>Reasons</Form.Label>
            <Form.Control as="textarea" rows="3" name="reasons" data-tag={position} data-test="reasons" onChange={handleChange} />
          </Form.Group>
        </Col>

        <Row className="action-row">
          <Col xs={12} sm={12} md={2} lg={3}>
            <Form.Group id="formGridCheckbox">
              <Form.Check name="isFinal" data-tag={position} type="checkbox" data-test="isFinal" label="This is my Final Destination" onChange={() => finalMarking(position)} />
            </Form.Group>
          </Col>
          <Col xs={12} sm={12} md={2} lg={3}>
            <Form.Group id="formGridCheckbox">
              <IconButton data-tag={position} aria-label="delete" data-test="remove-destination" onClick={() => removeDestination(position)}>
                <Delete fontSize="inherit" />
              </IconButton>
              <Form.Label>Remove this destination</Form.Label>
            </Form.Group>
          </Col>
        </Row>
      </span>
    );
  }
}
