import React from 'react';
import { Row, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const DestinationDisplay = ({ destination, index }) => (
      <Row>
        <Row className="destination-item">
          <div className="pad-items">
            <Form.Group controlId="tripRequests.TripTypeInputs">
              <h6>
                Destination
                {' '}
                {index + 1}
              </h6>
              <Form.Control className="select" as="select" defaultValue={destination.id}>
                <option value={destination.id}>{destination.location.name}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="tripRequests.TripTypeInputs">
              <h6>Arrival Date</h6>
              <DayPickerInput value={destination.arrivalDate} />
            </Form.Group>
            <Form.Group controlId="tripRequests.TripTypeInputs">
              <h6>Departure Date</h6>
              <DayPickerInput value={destination.departureDate || 'N/A'} />
            </Form.Group>
            <Form.Group controlId="tripRequests.TripTypeInputs">
              <h6>Bookings</h6>
              <Form.Control className="select" as="select">
                <option value="1">Booking</option>
              </Form.Control>
            </Form.Group>
          </div>
          <Row className="row">
            <Col>
              <Form.Label as="label">Reasons</Form.Label>
              <Form.Control className="textarea" as="textarea" rows="5" value={destination.reasons} />
            </Col>
          </Row>
        </Row>
      </Row>
);

DestinationDisplay.propTypes = {
  destination: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default DestinationDisplay;
