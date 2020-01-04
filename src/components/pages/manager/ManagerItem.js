/* eslint-disable react/self-closing-comp */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Button, Row, Col, Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RemoveRedEyeOutlined, CheckCircleOutlineOutlined, HighlightOffOutlined } from '@material-ui/icons';
import DestinationItem from '../requests/DestinationItem';
import { processRequestAction } from '../../../actions/requestsActions';
import { getManagerRequestAction } from '../../../actions/managerRequestAction';
import Confirm from '../../global/Confirm';

export class ManagerItem extends Component {
  state = {
    isLoading: false,
  };

  processAction = async (action, id) => {
    const { props } = this;
    await props.processRequestAction(action, id);
    await props.getManagerRequestAction();
  };

  renderStatus = (status) => {
    switch (status.id) {
      case 1:
        return (
          <Col className="request-status font-weight-bold" style={{ color: '#C2A90F' }}>{status.name}</Col>
        );
      case 2:
        return (
          <Col className="request-status font-weight-bold text-danger">{status.name}</Col>
        );
      default:
        return (
          <Col className="request-status font-weight-bold text-success">{status.name}</Col>
        );
    }
  };

  render() {
    const { props } = this;
    const { item, user, email } = props;

    return (
      <Card className="booking-card" data-test="request-item">
        <Card.Header className="text-primary">
          {item.departureDate}
          {' | '}
          {item.type.name}
          {' Trip'}
        </Card.Header>
        <Card.Body style={{ position: 'relative' }}>
          <Card.Text>
            <Row className="px-4 py-1 mb-0">
              <span className="font-weight-bold">Status:</span>
              {' '}
              {' '}
              {this.renderStatus(item.status)}
            </Row>
            <Row className="px-4 py-1 mb-0">
              <span className="font-weight-bold">
              Requester:
                {' '}
                {' '}
              {user}
              </span>
            </Row>
            <Row className="px-4 py-1 mb-0">
              <span className="font-weight-bold">
              E-mail:
                {' '}
                {' '}
              {email}
              </span>
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
            <Row className="px-4 py-1 mb-5">
              <span className="font-weight-bold">
                Reasons:
              </span>
              {' '}
              {' '}
              {item.reasons || 'N/A'}
            </Row>
            <Row className="mb-0 mx-auto manager-buttons-abs">
              <Col md={6}>
                <Confirm data-test="manager-approve" variant="success" action="approve" id={item.id} processAction={this.processAction} title="approve" size="md" buttonClass="process-request-button btn-block d-flex text-center" disabled={item.status.id === 3} icon={<CheckCircleOutlineOutlined />} />
              </Col>
              <Col md={6}>
                <Confirm variant="danger" action="reject" id={item.id} processAction={this.processAction} title="reject  " size="md" buttonClass="process-request-button btn-block" disabled={item.status.id === 2} icon={<HighlightOffOutlined />} />
              </Col>
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
  }
}

ManagerItem.propTypes = {
  processRequestAction: PropTypes.func,
  getManagerRequestAction: PropTypes.func,
  item: PropTypes.object,
  user: PropTypes.any,
  email: PropTypes.any,
};

export const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { processRequestAction, getManagerRequestAction })(ManagerItem);
