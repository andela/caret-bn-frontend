import React from 'react';
import StarRatings from 'react-star-ratings';
import { VerifiedUserOutlined, AccountCircle, AccountCircleOutlined } from '@material-ui/icons';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

export default function RateItem(rating) {
  return (
    <Row className="rateItem">
      <Col md={2} xs={6} sm={6} lg={2}>
        {(rating.rating.userImage)
          ? <img src={(rating.rating.userImage)} className="menu-photo" />
          : <AccountCircleOutlined fontSize="large" />}
      </Col>
      <Col md={6} xs={12} sm={12} lg={6} className="rateItemDetails">
        <p className="dateUser">
          {rating.rating.userName}
          {' '}
          on
          {' '}
          {moment(rating.rating.createdAt).format('YYYY/MM/DD')}
        </p>
        <StarRatings
          rating={rating.rating.rating}
          starRatedColor="#e99434"
          numberOfStars={5}
          name="rating"
          starEmptyColor="F5F1F1"
          starDimension="20px"
          starBorder="#e99434"
        />
        <p className="feedback">{rating.rating.feedback}</p>
      </Col>
    </Row>
  );
}
