/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Modal, Col, Container, Button, Row, Form,
} from 'react-bootstrap';
import { Add } from '@material-ui/icons';
import StarRatings from 'react-star-ratings';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { checkSupplier } from '../../helpers/authHelper';
import { GetAllAccommodation, likeUnlikeAccommodation } from '../../actions/accommodationActions';
import { getLocations } from '../../actions/locationActions';
import Breadcrumbs from '../global/Breadcrumbs';
import isAuthenticated from '../../helpers/isAuthenticated';
import AlertComponent from '../global/AlertComponent';
import { showAlert } from '../../actions/alertAction';

export class AllAccommodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userId: null,
      searchParams: null,
      error: {
        status: false,
        heading: null,
        message: null,
      },
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const userInfo = isAuthenticated();
    await this.props.GetAllAccommodation();
    await this.props.getLocations();
    this.setState({ isLoading: false });
    this.renderAcommodation = this.renderAcommodation.bind(this);
    await this.setState({
      userId: userInfo.payload.id,
    });
  }

  async handleLike(slug, action) {
    const { likeUnlikeAccommodation, GetAllAccommodation } = this.props;
    await likeUnlikeAccommodation(slug, action);
    await GetAllAccommodation();
  }

  async handleDislike(slug, action) {
    const { likeUnlikeAccommodation, GetAllAccommodation } = this.props;
    await likeUnlikeAccommodation(slug, action);
    await GetAllAccommodation();
  }

  handleChange = async (e) => {
    const { name, value } = e.target;
    await this.setState((prevState) => ({
      searchParams: {
        ...prevState.searchParams,
        [name]: value,
      },
    }));
  }

  submitSearch = async () => {
    const { searchParams } = this.state;
    const { showAlert, history } = this.props;
    await this.setState({
      error: {
        status: false,
        heading: null,
      },
    });
    if (searchParams === null) {
      await this.setState({
        error: {
          status: true,
          heading: 'Empty Search',
          message: 'You need to enter details',
        },
      });
      return showAlert();
    }
    history.push({
      pathname: '/accommodations/search/results',
      state: searchParams,
    });
  }

  SearchAccommodations = () => {
    const [show, setShow] = useState(false);
    const { locations } = this.props;
    const { error } = this.state;
    return (
      <Row style={{ margin: '10px' }}>
        <Button className="full-width-buttons" onClick={() => setShow(true)} data-test="search-button">
          Search Accommodations
        </Button>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Search Accommodations
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="center-items">
                {
                  (error.status) ? <AlertComponent variant="danger" heading={error.heading} message={error.message} /> : ''
                }
              </Row>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Form.Group>
                    <Form.Control as="select" name="location" data-test="location" onChange={this.handleChange}>
                      <option selected disabled>Select Location...</option>
                      <option value="">None</option>
                      {
                        locations ? locations.data.map((location) => <option key={location.id} value={location.name}>{location.name}</option>) : null
                      }
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Form.Group>
                    <Form.Control as="input" name="name" data-test="name" placeholder="Name" onChange={this.handleChange} />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Form.Group>
                    <Form.Control as="input" name="description" data-test="description" placeholder="Description" onChange={this.handleChange} />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Form.Group>
                    <Form.Control as="input" name="highlights" data-test="highlights" placeholder="Highlights" onChange={this.handleChange} />
                  </Form.Group>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Form.Group>
                    <Form.Control as="input" name="amenities" data-test="amenities" placeholder="Amenities" onChange={this.handleChange} />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Form.Group>
                    <Form.Control as="input" name="rating" data-test="rating" placeholder="Rating" onChange={this.handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Button className="full-width-buttons" data-test="submit-button" onClick={() => this.submitSearch()}>Search</Button>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </Row>
    );
  }

  renderAcommodation() {
    const { accommodations } = this.props;

    if (accommodations) {
      const accommodation = accommodations.map((post) => (
        <Container key={post.id} className="accommodation-container container-fluid">
          <Row className="p-3">
            <Col sm>
              <img src={(typeof (post.images) === 'string') ? post.images : post.images[0]} alt="accommodation" />
            </Col>
            <Col className="info-container" sm>
              <Link to={`/accommodations/${post.slug}`}>
                <h1>{post.name}</h1>
              </Link>
              <div><h2>{post.averageRating}</h2></div>
              <div>
                <h2>
                  <StarRatings
                    rating={post.averageRating}
                    starRatedColor="#e99434"
                    numberOfStars={5}
                    name="rating"
                    starEmptyColor="F5F1F1"
                    starDimension="30px"
                  />
                  &nbsp;
                  &nbsp;
                  {post.ratings.length}
                  &nbsp;
                   Rating(s)
                </h2>
              </div>
              <div>
                <h3>{post.accommodationLocation.name}</h3>
              </div>
              <div><h4>description</h4></div>
              <div><h2>{post.description}</h2></div>
            </Col>
            <Col className="info" sm>
              <h5 md={4}>
                {post.availableSpace}
                &nbsp;
                Rooms available
              </h5>
              <h6 md={4}>
                $
              {post.cost}
              </h6>
              <h2 md={4}>per night</h2>
              <h2 md={4} className="like">
                {post.hasLiked ? <ThumbUpAltIcon className="like-button" data-test="like-button" /> : <ThumbUpOutlinedIcon className="like-button" data-test="like-button" onClick={() => this.handleLike(post.slug, 'like')} />}
                {' '}
                {`${post.Likes} Likes`}
              </h2>
              <h2 md={4} className="dislike">
                {post.hasUnliked ? <ThumbDownAltIcon className="dislike-button" data-test="dislike-button" /> : <ThumbDownOutlinedIcon className="dislike-button" data-test="dislike-button" onClick={() => this.handleDislike(post.slug, 'unlike')} />}
                {' '}
                {`${post.Unlikes} Dislikes`}
              </h2>
              <Link to={`/accommodations/${post.slug}`}>
                <Button className="booking" size="lg">
                  Make Booking
                </Button>
              </Link>
              {
                (post.ownerUser.id === this.state.userId)
                  ? (
                    <Link to={{ pathname: `/accommodations/${post.slug}/edit` }}>
                      <Button varian="warning" className="booking" size="lg">
                        Edit
                      </Button>
                    </Link>
                  )
                  : null
              }
            </Col>
          </Row>
        </Container>
      ));
      return accommodation;
    }
    return (
      <div className="d-flex justify-content-center">
        <i className="fas fa-spinner fa-pulse loader-big" />
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="accommodation">
        <Row>
          <Col md={5} className="breadcrumbs">
            <Breadcrumbs itemsArray={['> Home', '  accommodations']} />
          </Col>
          <Col>
            {checkSupplier() ? (
              <Button href="/accommodations/new">
                <Add />
                Create new accommodation
              </Button>
            ) : null}
          </Col>
        </Row>
        <Row>
          <this.SearchAccommodations data-test="search-acc" />
        </Row>
        {isLoading
          ? (
            <div className="d-flex justify-content-center">
              <i className="fas fa-spinner fa-pulse loader-big" />
            </div>
          )
          : this.renderAcommodation()}
      </div>
    );
  }
}
AllAccommodation.propTypes = {
  GetAllAccommodation: PropTypes.func.isRequired,
  likeUnlikeAccommodation: PropTypes.func.isRequired,
  accommodations: PropTypes.array.isRequired,
};
export const mapStateToProps = (state) => ({
  accommodations: state.accommodation.getAccommodation,
  locations: state.locations.data,
});

export default withRouter(connect(mapStateToProps, {
  GetAllAccommodation, getLocations, likeUnlikeAccommodation, showAlert,
})(AllAccommodation));
