/* eslint-disable react/no-danger */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Carousel, Modal,
  Container, Row, Col, Button, Badge, Spinner,
} from 'react-bootstrap';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import StarRatings from 'react-star-ratings';
import { Link, withRouter } from 'react-router-dom';
import { GetSingleAccommodation, likeUnlikeAccommodation, deleteAccommodation } from '../../actions/accommodationActions';
import { BookAccommodation, getBookings } from '../../actions/bookingActions';
import Breadcrumbs from '../global/Breadcrumbs';
import 'react-day-picker/lib/style.css';
import img3 from '../../assets/images/cocktail.png';
import isAuthenticated from '../../helpers/isAuthenticated';
import AlertComponent from '../global/AlertComponent';
import Booking from './Boooking';
import { hideAlert, showAlert } from '../../actions/alertAction';
import { rateAccommodation } from '../../actions/ratingsActions';
import RatingModal from './RatingModal';
import RateItem from './RateItem';
import {
  EditOutlined, LocationOnOutlined, AttachMoneyOutlined, VerifiedUser, LocalHotel,
} from '@material-ui/icons';
import BookMark from './accommodations/BookMark';
import { checkHost } from '../../helpers/authHelper';
import Confirm from '../global/Confirm';


export class SingleAccommodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userId: null,
      error: {
        status: false,
        heading: null,
        message: null,
      },
      hasBooked: false,
      ratings: {
        rating: 0,
        feedback: '',
      },
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  componentDidMount = async () => {
    const userInfo = isAuthenticated();
    const {
      slug, GetSingleAccommodation, getBookings, accommodation,
    } = this.props;
    this.setState({ isLoading: true });
    await GetSingleAccommodation(slug);
    await getBookings();
    this.setState({ isLoading: false });
    this.single = this.renderAcommodation.bind(this);
    await this.setState({
      userId: userInfo.payload.id,
      userRole: userInfo.payload.role,
      hasBooked: this.props.bookings.data.some((booking) => booking.accommodation.id === this.props.accommodation.id),
    });
  }

  async componentWillUnmount() {
    const { hideAlert } = this.props;
    await hideAlert();
  }

  deleteAcc = async () => {
    const {
      accommodation, status, deleteAccommodation, history,
    } = this.props;

    await deleteAccommodation(accommodation.id);

    switch (this.props.status) {
      case 'success':
        return history.push('/accommodations');
      case 'fail':
        this.setState({
          error: {
            status: true,
            message: 'Cannot delete this accommodation',
          },
        });
        return showAlert();
      default:
        return null;
    }
  }

  async handleLike() {
    const { accommodation, likeUnlikeAccommodation, GetSingleAccommodation } = this.props;
    await likeUnlikeAccommodation(accommodation.slug, 'like');
    await GetSingleAccommodation(accommodation.slug);
  }

  async handleDislike() {
    const { accommodation, likeUnlikeAccommodation, GetSingleAccommodation } = this.props;
    await likeUnlikeAccommodation(accommodation.slug, 'unlike');
    await GetSingleAccommodation(accommodation.slug);
  }

  handleChange = async (e) => {
    const { name, value } = e.target;
    await this.setState((prevState) => ({
      ratings: {
        ...prevState.ratings,
        [name]: value,
      },
    }));
  }

  submitRating = async (e, setShow) => {
    e.preventDefault();
    const { ratings: { rating, feedback } } = this.state;
    const {
      showAlert, rateAccommodation, accommodation, GetSingleAccommodation,
    } = this.props;

    await this.setState({
      error: {
        status: false,
        heading: '',
        message: '',
      },
    });

    if (rating <= 3 && feedback === '') {
      await this.setState({
        error: {
          status: true,
          heading: 'Invalid Rating',
          message: 'Please supply feedback for ratings under a 4',
        },
      });
      return showAlert();
    }

    const payload = {
      accommodationId: accommodation.id,
      rating,
      ...(rating <= 3 && { feedback }),
      ...((rating > 3 && feedback !== '') && { feedback }),
    };

    await rateAccommodation(payload, setShow);
    await GetSingleAccommodation(accommodation.slug);
  }

  renderAcommodation() {
    const {
      accommodation, booked, bookedError, ratings,
    } = this.props;
    const { userRole, hasBooked } = this.state;
    const { ownerUser, hasLiked, hasUnliked } = accommodation;
    const ratingNumber = accommodation.ratings ? accommodation.ratings.length : 0;
    const imageArray = accommodation.images ? accommodation.images : [];
    const location = accommodation.accommodationLocation ? accommodation.accommodationLocation.name : null;
    const ratingArray = accommodation.ratings ? accommodation.ratings : [];
    let images = [];

    if (accommodation) {
      switch (typeof imageArray) {
        case 'string':
          images.push(accommodation.images);
          break;
        default:
          images = imageArray;
          break;
      }

      document.title = `Barefoot Nomad - Accommodations - ${accommodation.name}`;

      return (
        <div key={accommodation.id} className="container-fluid single-container ">
          <Row className="row-between">
            <Col md={5} className="breadcrumbs">
              <Breadcrumbs itemsArray={['> Home', '  Accommodations', accommodation.name]} />
            </Col>
          </Row>
          <Row className="center-items">
            {
              (ratings && ratings.status === 'error')
                ? <AlertComponent variant="danger" heading="Could not rate accommodation" message={ratings.dataError.data.message} />
                : (ratings && ratings.status === 'success') ? <AlertComponent variant="success" heading="Successfully placed rating" message={ratings.data.message} /> : ''
            }
          </Row>
          <Container className="containerA container-fluid">
            <Row>
              <Col xs={6} className="single-column container-fluid col-lg-6 col-md-6 col-12">
                <Carousel
                  className="MyCarousel"
                >
                  {images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={image} alt="accommodation" />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <Row className="name-holder" style={{ margin: '0 .3px' }}>
                  <Link>
                    <p className="accommodation-name">{accommodation.name}</p>
                  </Link>
                  <BookMark hasBookmarked={accommodation.hasBookmarked} slug={accommodation.slug} />
                </Row>
                <Row className="highlights-amenities-box">
                  <p className="title"> Highlights </p>
                  <div className="highlights">
                    <p dangerouslySetInnerHTML={{
                      __html: accommodation.highlights,
                    }}
                    />
                  </div>
                </Row>
                <Row className="highlights-amenities-box">
                  <p className="title"> amenities </p>
                  <div>
                    <p
                      className="highlights"
                      dangerouslySetInnerHTML={{
                        __html: accommodation.amenities,
                      }}
                    />
                  </div>
                </Row>
              </Col>
              <Col xs={12} sm={12} lg={6} md={6}>
                <Row className="star-ratings">
                  <StarRatings
                    rating={accommodation.averageRating}
                    starRatedColor="#e99434"
                    numberOfStars={5}
                    name="rating"
                    starEmptyColor="F5F1F1"
                    starDimension="22px"
                    starBorder="#e99434"
                  />
                  <span xs={12} sm={12} lg={12} md={12} className="average-rating">
                    <Badge variant="primary">
                      {(accommodation.averageRating)
                        ? accommodation.averageRating.toFixed(1)
                        : '0.0'}
                    </Badge>
                    <span>
                      {(accommodation.averageRating)
                        ? `  from ${ratingNumber} rating(s)`
                        : ''}
                    </span>
                  </span>
                </Row>
                {(accommodation.hasRated)
                  ? <p className="information-tags">You have rated this accommodation</p>
                  : (userRole === 5) ? <p className="information-tags">You are not eligible to rate this accommodation</p>
                    : (!hasBooked) ? <p className="information-tags">You can only rate accommodations you have booked with</p>
                      : <RatingModal handleChange={this.handleChange} submitRating={this.submitRating} error={this.state.error} ratings={this.state.ratings} data-test="rate-acc-btn" />}
                <div className="accommodation-description">
                  <p dangerouslySetInnerHTML={{
                    __html: accommodation.description,
                  }}
                  />
                  <Row className="info-icons">
                    <span className="info-icon">
                      <LocationOnOutlined />
                      {(accommodation.accommodationLocation) ? accommodation.accommodationLocation.name : ''}
                    </span>
                    <span className="info-icon">
                      <AttachMoneyOutlined />
                      <span className="acc-pricing">
                        <Badge variant="danger">
                          <span className="cost">
                            {accommodation.currency}
                            {' '}
                            {(accommodation.cost) ? accommodation.cost.toFixed(2) : ''}
                            {' '}
                          </span>
                        </Badge>
                        <span className="unit">
                          {' '}
                          {' '}
                          per night
                        </span>
                      </span>
                    </span>
                    <span className="info-icon">
                      <LocalHotel />
                      &nbsp;
                          <Badge variant="info">
                        {accommodation.availableSpace}
                        &nbsp;
                        Rooms available
                          </Badge>
                    </span>
                    {
                      (ownerUser !== undefined) ? (accommodation.ownerUser.id === this.state.userId)
                        ? (
                          <span className="info-icon">
                            <VerifiedUser />
                            &nbsp;
                            <Badge variant="warning">
                              <Link to={{ pathname: `/accommodations/${accommodation.slug}/edit` }} className="edit-links">
                                Edit
{' '}
                                {accommodation.name}
                              </Link>
                            </Badge>
                          </span>
                        )
                        : null : null
                    }
                  </Row>
                  {
                    (ownerUser !== undefined) ? (accommodation.ownerUser.id === this.state.userId)
                      ? (
                        <Row className="delete-row">
                          <Confirm processAction={() => this.deleteAcc()} action={`Delete ${accommodation.name}`} size="md" title="Delete" data-test="delete" variant="danger" />
                          <p>Only do this if you are absolutely certain</p>
                        </Row>
                      )
                      : null : null
                  }
                </div>
                {bookedError
                  && (
                    <Row className="center-items">
                      <AlertComponent variant="danger" heading="" message={(Array.isArray(bookedError.error)) ? bookedError.error[0] : bookedError.message} />
                    </Row>
                  )}
                {booked && (
                  <Row className="center-items">
                    <AlertComponent variant="success" heading="" message={booked.message} />
                  </Row>
                )}
                {checkHost() ? null : <Booking />}
                <Row>
                  <Col className="like">
                    {checkHost() ? null : hasLiked ? <ThumbUpAltIcon className="like-button" /> : <ThumbUpOutlinedIcon className="like-button" data-test="like" onClick={this.handleLike} />}
                    {` Total Likes: ${accommodation.Likes}`}
                  </Col>
                  <Col className="dislike">
                    {checkHost() ? null : hasUnliked ? <ThumbDownAltIcon className="dislike-button" /> : <ThumbDownOutlinedIcon className="dislike-button" data-test="dislike" onClick={this.handleDislike} />}
                    {` Total Dislikes: ${accommodation.Unlikes}`}
                  </Col>
                </Row>
                <h4>Reviews</h4>
                {ratingArray.map((rating) => (
                  <RateItem rating={rating} />
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" animation="grow" size="lg" variant="primary" />
      </div>
    );
  }

  render() {
    const {
      isLoading,
    } = this.state;

    return (
      <div className="d-flex justify-content-center single-container">
        {isLoading ? <Spinner animation="border" animation="grow" size="lg" variant="primary" /> : this.renderAcommodation()}
      </div>
    );
  }
}
SingleAccommodation.propTypes = {
  booked: PropTypes.object,
  bookedError: PropTypes.object,
  accommodation: PropTypes.object.isRequired,
  slug: PropTypes.string,
  GetSingleAccommodation: PropTypes.func,
  hideAlert: PropTypes.func,
  likeUnlikeAccommodation: PropTypes.func,
  getBookings: PropTypes.func,
  deleteAccommodation: PropTypes.func,
};

export const mapStateToProps = (state) => ({
  accommodation: state.accommodation.singleAccommodation,
  status: state.accommodation.deleteStatus,
  booked: state.bookings.booked,
  bookings: state.bookings.data,
  bookedError: state.bookings.bookedError,
  like: state.accommodation.like,
  dislike: state.accommodation.dislike,
  ratings: state.ratings,
});

export default compose(withRouter, connect(mapStateToProps, {
  GetSingleAccommodation,
  BookAccommodation,
  getBookings,
  hideAlert,
  showAlert,
  rateAccommodation,
  likeUnlikeAccommodation,
  getBookings,
  deleteAccommodation,
}))(SingleAccommodation);
