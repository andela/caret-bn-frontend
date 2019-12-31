import React, { Component, useState } from 'react';
import {
  Modal,
  Row, Col, Button, Form,
} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import AlertComponent from '../global/AlertComponent';


export default class RatingModal extends Component {
  changeRating = (newRating, name) => {
    this.props.handleChange({
      target: {
        name,
        value: newRating,
      },
    });
  };


  rateAccommodation = () => {
    const [show, setShow] = useState(false);

    const {
      handleChange, submitRating, error, ratings,
    } = this.props;


    return (
      <Row style={{ margin: '10px' }}>
        <Button className="ratingButton" onClick={() => setShow(true)} data-test="rate-button">Rate us</Button>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          size="md"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Rate Accommodations
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => submitRating(e, setShow)}>
              <Row className="center-items">
                {
                  (error.status) ? <AlertComponent variant="danger" heading={error.heading} message={error.message} /> : ''
                }
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Form.Group>
                    <StarRatings
                      data-test="rating"
                      rating={ratings.rating}
                      starRatedColor="e99434"
                      changeRating={this.changeRating}
                      numberOfStars={5}
                      name="rating"
                      starDimension="40px"
                      starSpacing="15px"
                      starHoverColor="rgb(255,165,0)"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Form.Group>
                    <Form.Control as="textarea" name="feedback" placeholder="Feedback" data-test="feedback" value={ratings.feedback} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Button className="full-width-buttons" type="submit" data-test="submit-button">Rate Accommodation</Button>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </Row>
    );
  }

  render() {
    return (
      <this.rateAccommodation data-test="rating-modal" />
    );
  }
}
