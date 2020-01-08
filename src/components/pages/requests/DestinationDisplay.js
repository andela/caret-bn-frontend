import React from 'react';
import { Row, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DestinationDisplay = ({
  destination, index, disabled, location, departureDisable, onChange,
  id,
  arrivalDate,
  departureDate,
  reasons,
}) => (
  <span data-test="destination-display" className="destination-wrapper">
    <Col xs={12} sm={12} md={4} lg={4}>
      <Form.Group>
        <Form.Label>
            Destination
            {' '}
            {index + 1}
        </Form.Label>
        <Form.Control
          as="select"
          disabled
          onChange={onChange}
          name={`id-${index}`}
          id={`id-${index}`}
        >
          <option value={destination.location.id}>{destination.location.name}</option>
          {location}
        </Form.Control>
      </Form.Group>
    </Col>

    <Col xs={12} sm={12} md={4} lg={4}>
      <Form.Group>
        <Form.Label>Arrival Date</Form.Label>
        <Form.Control
          as="input"
          type="date"
          value={arrivalDate}
          disabled={disabled}
          onChange={onChange}
          name={`arrivalDate-${index}`}
          id={`arrivalDate-${index}`}
        />
      </Form.Group>
    </Col>

    <Col xs={12} sm={12} md={4} lg={4}>
      <Form.Group>
        <Form.Label>Departure Date</Form.Label>
        <Form.Control
          as="input"
          type="date"
          value={departureDate}
          disabled={departureDisable}
          onChange={onChange}
          name={`departureDate-${index}`}
          id={`departureDate-${index}`}
        />
      </Form.Group>
    </Col>

    <Col xs={12} sm={12} md={9} lg={9}>
      <Form.Group>
        <Form.Label>Reasons</Form.Label>
        <Form.Control
          as="textarea"
          value={reasons}
          disabled={disabled}
          onChange={onChange}
          name={`reasons-${index}`}
          id={`reasons-${index}`}
        />
      </Form.Group>
    </Col>
  </span>
);

DestinationDisplay.propTypes = {
  destination: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default DestinationDisplay;
