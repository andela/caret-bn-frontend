/* eslint-disable react/self-closing-comp */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
          <Col className="request-status font-weight-bold pl-5" style={{ color: '#C2A90F' }}>{status.name}</Col>
        );
      case 2:
        return (
          <Col className="request-status font-weight-bold pl-5 text-danger">{status.name}</Col>
        );
      default:
        return (
          <Col className="request-status font-weight-bold pl-5 text-success">{status.name}</Col>
        );
    }
  };

  render() {
    const { props } = this;
    const { item, user, email } = props;

    return (
      <Container data-test="request-item">
        <Container className="request-item mb-3 p-3">
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
            <Row className="px-2 py-1 mb-0">
              <Col md={9} className="text-primary">
                {item.departureDate}
                {' | '}
                {item.type.name}
                {' Trip'}
              </Col>
              {this.renderStatus(item.status)}
            </Row>
            <Row className="px-2 py-1 mb-0">
              <Col>
                {item.destinations.map((destination, i) => (
                  <DestinationItem destination={destination} key={destination.id} index={i} />
                ))}
              </Col>
            </Row>
            <Row>
              <Col md={8} className="px-3 pb-3 mb-0">
                <span className="font-weight-bold">
                  Return Date:
                </span>
                {' '}
                {item.returnDate || 'N/A'}
              </Col>
            </Row>
            <Row>
              <Col md={9} className="px-3 mb-0">
                <span className="font-weight-bold">
                  Reasons:
                </span>
                {item.reasons || 'N/A'}
              </Col>
              <Col>
                <Link to={`/requests/${item.id}`}>
                  <Button variant="primary">
                    View request
                  </Button>
                </Link>
              </Col>
            </Row>
              {item.status.id === 1 && (
                <Row>
                  <Col md={8} />
                  <Col md={2}>
                    <Confirm data-test="manager-approve" variant="success" action="approve" id={item.id} processAction={this.processAction} title="approve" size="md" buttonClass="process-request-button btn-block" />
                  </Col>
                  <Col md={2}>
                    <Confirm variant="danger" action="reject" id={item.id} processAction={this.processAction} title="reject" size="md" buttonClass="process-request-button btn-block" />
                  </Col>
                </Row>
              ) }
        </Container>
      </Container>
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
