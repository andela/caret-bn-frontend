/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { GetSingleAccommodation } from '../../actions/accommodationActions';
import { BookAccommodation, getBookings } from '../../actions/bookingActions';
import Breadcrumbs from '../global/Breadcrumbs';
import 'react-day-picker/lib/style.css';
import img3 from '../../assets/images/cocktail.png';
import isAuthenticated from '../../helpers/isAuthenticated';
import AlertComponent from '../global/AlertComponent';
import Booking from './Boooking';
import { hideAlert } from '../../actions/alertAction';

export class SingleAccommodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userId: null,
    };
  }

  componentDidMount = async () => {
    const userInfo = isAuthenticated();
    const { slug } = this.props;
    this.setState({ isLoading: true });
    await this.props.GetSingleAccommodation(slug);
    this.setState({ isLoading: false });
    this.single = this.renderAcommodation.bind(this);
    await this.setState({
      userId: userInfo.payload.id,
    });
  }

  async componentWillUnmount() {
    const { hideAlert } = this.props;
    await hideAlert();
  }

  renderAcommodation() {
    const {
      accommodation, booked, bookedError,
    } = this.props;
    const { userId } = this.state;
    const { ownerUser } = accommodation;
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

      return (
        <div key={accommodation.id} className="container-fluid single-container ">
          <Row>
        <Col md={5} className="breadcrumbs">
          <Breadcrumbs itemsArray={['> Home', '  Accommodations', accommodation.name]} />
        </Col>
        {
              (ownerUser !== undefined) ? (accommodation.ownerUser.id === this.state.userId)
                ? (
                  <Link to={{ pathname: `/accommodations/${accommodation.slug}/edit` }} className="edit-links">
                    <a>Edit</a>
                  </Link>
                )
                : null : null
            }
          <Col>
                {bookedError && <AlertComponent variant="danger" heading="Error" message={(Array.isArray(bookedError.error)) ? bookedError.error[0] : bookedError.message} />}
                {booked && <AlertComponent variant="success" heading="success" message={booked.message} />}
          </Col>
          </Row>
          <Container className="containerA container-fluid">
            <Row>
              <Col xs={6} className="single-column container-fluid col-lg-6 col-md-6 col-12">
                <Carousel className="MyCarousel">
                  {images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={image} alt="accommodation" />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <Container className="containerC container-fluid  small-container">
                <div className="small-container">
                <Row>
                  <Col>
                  <h3> Highlights </h3>
                    <div className="highlights">
                        <i>
                          <h6>{accommodation.highlights}</h6>
                        </i>
                    </div>
                  </Col>
                  <div>
                    <img src={img3} alt="icon" />
                  </div>
                  <Col>

                    <h3 className="amenities"> Anemities </h3>
                      <div>
                        <i>
                          <h6 className="highlights">{accommodation.amenities}</h6>
                        </i>
                      </div>

                  </Col>
                </Row>
                </div>
                </Container>
              </Col>
              <Col xs={6} className="single-column container-fluid col-lg-6 col-md-6 col-12">
                <div className="infio">
                  <i>
                    <h1>{accommodation.name}</h1>
                  </i>
                  <i>
                    <h2>
                      {accommodation.currency}
                      &nbsp;
                      {accommodation.cost}
                      &nbsp;
                        per night
                    </h2>
                  </i>
                </div>
                <h1>{accommodation.averageRating}</h1>
                &nbsp;
                  <i>
                  {ratingNumber}
                  &nbsp;
                 Rating(s)
                  </i>
                  <i className="amenities">{location}</i>
                <h3>
                  <StarRatings
                    rating={accommodation.averageRating}
                    starRatedColor="#e99434"
                    numberOfStars={5}
                    name="rating"
                    starEmptyColor="F5F1F1"
                    starDimension="25px"
                    starBorder="#e99434"
                  />
                  <i>
                    <Button className="ratingButton">Rate us</Button>
                  </i>
                </h3>
                <div className="description">
                  <h4>Description</h4>
                  <i>{accommodation.description}</i>
                </div>
                <Booking />
                <h4>Ratings</h4>
                {ratingArray.map((rating) => (
                  <div>
                    <h3>
                      Rating:
                        {rating.rating}
                    </h3>
                    <i>{rating.feedback}</i>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    return (
      <h1 className="d-flex justify-content-center">
        <i className="fas fa-spinner fa-pulse loader-big" />
      </h1>
    );
  }

  render() {
    const {
      isLoading,
    } = this.state;

    return (
      <div className="d-flex justify-content-center single-container">
         {isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : this.renderAcommodation()}
      </div>
    );
  }
}
SingleAccommodation.propTypes = {
  booked: PropTypes.object,
  bookedError: PropTypes.object,
  accommodation: PropTypes.object.isRequired,
  slug: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  accommodation: state.accommodation.singleAccommodation,
  booked: state.bookings.booked,
  bookings: state.bookings.data,
  bookedError: state.bookings.bookedError,
});

export default connect(mapStateToProps, {
  GetSingleAccommodation, BookAccommodation, getBookings, hideAlert,
})(SingleAccommodation);
