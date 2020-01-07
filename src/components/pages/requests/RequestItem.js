/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row, Col, Card,
} from 'react-bootstrap';
import { RemoveRedEyeOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import DestinationItem from './DestinationItem';

const RequestItem = ({ item }) => {
  const renderStatus = (status) => {
    switch (status.id) {
      case 1:
        return (
          <span className="request-status font-weight-bold pl-1" style={{ color: '#C2A90F' }}>
            {status.name}
          </span>
        );
      case 2:
        return (
          <span className="request-status font-weight-bold text-danger pl-1">
            {status.name}
          </span>
        );
      default:
        return (
          <span className="request-status font-weight-bold text-success pl-1">
            {status.name}
          </span>
        );
    }
  };

  return (
    <Card className="booking-card" data-test="request-item">
      <Card.Header className="text-primary">
        {item.departureDate}
        {' | '}
        {item.type.name}
        {' Trip'}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <Row className="px-4 py-1 mb-0">
            <span className="font-weight-bold">
              Status:
            </span>
            {renderStatus(item.status)}
          </Row>
          <Row className="px-4 py-1 mb-0">
            {item.destinations.map((destination, i) => (
              <DestinationItem destination={destination} key={destination.id} index={i} />
            ))}
          </Row>
          <Row className="px-4 py-1 mb-0">
            <span className="font-weight-bold">
              Return Date:
            </span>
            {' '}
            {' '}
            {item.returnDate || 'N/A'}
          </Row>
          <Row className="px-4 py-1 mb-0">
            <span className="font-weight-bold">
              Reasons:
            </span>
            {' '}
            {' '}
            {item.reasons || 'N/A'}
          </Row>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Link style={{ textDecoration: 'none' }} to={`/requests/${item.id}`} className="text-primary">
          <RemoveRedEyeOutlined />
          {' '}
          {' '}
          View request
        </Link>
      </Card.Footer>
    </Card>
  );
};

RequestItem.propTypes = {
  item: PropTypes.object,
};

export default RequestItem;
