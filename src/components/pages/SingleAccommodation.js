import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import StarRatings from 'react-star-ratings';
import { GetSingleAccommodation } from '../../actions/accommodationActions';
import Breadcrumbs from '../global/Breadcrumbs';
import img3 from '../../assets/images/cocktail.png';
import calendar from '../../assets/images/calendar.png';

export class SingleAccommodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount= async () => {
    const { slug } = this.props;
    this.setState({ isLoading: true });
    await this.props.GetSingleAccommodation(slug);
    this.setState({ isLoading: false });
    this.single = this.singleAccommodation.bind(this);
  }

  renderAcommodation() {
    const { accommodation } = this.props;
    const post = accommodation;
    const ratingNumber = post.ratings ? post.ratings.length : 0;
    const imageArray = post.images ? post.images : [];
    const ratingArray = post.ratings ? post.ratings : [];
    let images = [];

    if (accommodation) {
      switch (typeof imageArray) {
        case 'string':
          images.push(post.images);
          break;
        default:
          images = imageArray;
          break;
      }
      return (
        <div key={post.id}>
          <Row>
        <Col md={5} className="breadcrumbs">
          <Breadcrumbs itemsArray={['> Home', '  accommodations', post.name]} />
        </Col>
          </Row>
          <Container className="containerA" class="container-fluid">
            <Row>
              <Col xs={6}>
                <Carousel className="MyCarousel">
                  {images.map((image, index) => (
                    <Carousel.Item key={index}>
                    <img className="d-block w-100" src={image} alt="accommodation" />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <Container className="containerC">
                 <h3> Highlights & Anemities </h3>
                  <div>
                    <img src={img3} alt="icon" />
                    <h3>
                      <div className="highlights">
                        <i>
                          <h3>{post.highlights}</h3>
                        </i>
                      </div>
                      <div className="amenities">
                        <i>
                          <h3>{post.amenities}</h3>
                        </i>
                      </div>
                    </h3>
                  </div>
                </Container>
              </Col>
              <Col xs={6}>
                <div className="infio">
                  <i>
                    <h1>{post.name}</h1>
                  </i>
                  <i>
                    <h2>
                      {post.currency}
                      &nbsp;
                      {post.cost}
                      &nbsp;
                        per night
                    </h2>
                  </i>
                </div>
                <h1>{post.averageRating}</h1>
                &nbsp;
                  <i>
                    {ratingNumber}
                  &nbsp;
                 Rating(s)
                  </i>
                <h3>
                  <StarRatings
                    rating={post.averageRating}
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
                  <i>{post.description}</i>
                </div>
                <Container className="containerB">
                  <h3><b>Make a reservation</b></h3>
                  <div className="bookingContainer">
                    <i>
                      <input type="date" name="departure" />
                    </i>
                    <i>
                      <img src={calendar} alt="icon" className="calendarIcon" />
                    </i>
                    &nbsp;
                    &nbsp;
                    <i>
                      <input type="date" name="end" />
                    </i>
                    <i>
                      <img src={calendar} alt="icon" className="calendarIcon" />
                    </i>
                    <input
                      type="text"
                      name="rooms"
                      placeholder="Number of Rooms"
                      className="Input-Text"
                    />
                    <Button className="Button" variant="primary" size="sm">
                      Make Booking
                    </Button>
                  </div>
                </Container>
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
    const { isLoading } = this.state;
    return (
      <div className="d-flex justify-content-center">
         {isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : this.renderAcommodation()}
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  accommodation: state.accommodation.singleAccommodation,
});
export default connect(mapStateToProps, { GetSingleAccommodation })(SingleAccommodation);
