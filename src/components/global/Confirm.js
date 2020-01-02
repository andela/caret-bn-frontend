import React, { Component, useState } from 'react';
import {
  Row, Button, Modal, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

export class Confirm extends Component {
  state = {
    isLoading: false,
  };

  confirmAction = async () => {
    const { props } = this;
    const { action, id, processAction } = props;
    this.setState({ isLoading: true });
    await processAction(action, id);
    this.setState({ isLoading: false });
  }

  showModal = () => {
    const { props, state } = this;
    const { isLoading } = state;
    const {
      action, title, size, buttonClass, variant,
    } = props;
    const [show, setShow] = useState(false);
    return (
      <Row>
        <Button data-test="confirm-button" variant={variant} show={show} onClick={() => setShow(true)} size={size} className={buttonClass}>
          {title}
        </Button>
      <Modal show={show} onHide={() => setShow(false)} size="md" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Are you sure you want to
            {' '}
            {action}
            ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { isLoading ? (
            <div className="text-center">
              Processing
              {' '}
              <i className="fas fa-spinner fa-pulse" />
            </div>
          ) : (
            <Row>
              <Col md={6}>
                <Button data-test="confirm-yes" variant="success" onClick={() => this.confirmAction().then(() => setShow(false))}>Yes!</Button>
              </Col>
              <Col>
                <Button className="float-right" variant="danger" onClick={() => setShow(false)}>No!</Button>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
      </Row>
    );
  };

  render() {
    return <this.showModal />;
  }
}

Confirm.propTypes = {
  action: PropTypes.any,
  id: PropTypes.any,
  processAction: PropTypes.any,
  title: PropTypes.any,
  size: PropTypes.any,
  buttonClass: PropTypes.any,
  variant: PropTypes.any,
};

export default Confirm;
