import React from 'react';
import { Row, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DestinationDisplay = ({ destination, index }) => (
  <span data-test="destination-display" className="destination-wrapper">
    <Col xs={12} sm={12} md={4} lg={4}>
      <Form.Group>
        <Form.Label>
            Destination
            {' '}
            {index + 1}
        </Form.Label>
        <Form.Control as="select" defaultValue={destination.id} disabled>
          <option value={destination.id}>{destination.location.name}</option>
        </Form.Control>
      </Form.Group>
    </Col>

    <Col xs={12} sm={12} md={4} lg={4}>
      <Form.Group>
        <Form.Label>Arrival Date</Form.Label>
        <Form.Control as="input" type="date" name="arrivalDate" defaultValue={destination.arrivalDate} disabled />
      </Form.Group>
    </Col>

    <Col xs={12} sm={12} md={4} lg={4}>
      <Form.Group>
        <Form.Label>Departure Date</Form.Label>
        <Form.Control as="input" type="date" name="departureDate" defaultValue={destination.departureDate || 'N/A'} disabled />
      </Form.Group>
    </Col>

    <Col xs={12} sm={12} md={9} lg={9}>
      <Form.Group>
        <Form.Label>Reasons</Form.Label>
        <Form.Control as="textarea" rows="3" name="reasons" value={destination.reasons} disabled />
      </Form.Group>
    </Col>
  </span>
);

DestinationDisplay.propTypes = {
  destination: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default DestinationDisplay;
