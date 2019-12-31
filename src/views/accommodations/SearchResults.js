/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  Container, Col, Row, Button,
} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { accommodationSearch } from '../../actions/accommodationActions';
import PageLoading from '../../components/global/PageLoading';
import isAuthenticated from '../../helpers/isAuthenticated';

class SearchResults extends Component {
  state = {
    isLoading: true,
    userId: 0,
  }

  componentDidMount = async () => {
    const userInfo = isAuthenticated();
    const params = this.props.location.state;
    const { accommodationSearch } = this.props;

    let searchParams = '';

    Object.keys(params).forEach((key) => {
      if (params[`${key}`] !== '') {
        searchParams += `${key}=${params[`${key}`]}&`;
      }
    });
    searchParams = searchParams.substring(0, searchParams.length - 1);
    if (searchParams !== '') {
      searchParams = `?${searchParams}`;
    }
    await accommodationSearch(searchParams);
    this.setState({
      isLoading: false,
      userId: userInfo.payload.id,
    });
  }

  ShowResults = () => {
    const { accommodations } = this.props;
    if (accommodations) {
      const accommodation = (
        <Row className="center-items">
          <h1>Search results</h1>
          {
            accommodations.data.map((post) => (
              <div className="accommodation" data-test="accommodation-component">
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
                      <Link to={`/accommodations/${post.slug}`}>
                        <Button className="booking" size="lg">
                          Make Booking
                        </Button>
                      </Link>
                      {
                        (post.owner === this.state.userId)
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
              </div>
            ))
          }
        </Row>
      );
      return accommodation;
    }
  }

  ShowError = () => {
    const { searchError } = this.props;
    return (
      <div className="error-page">
        <h1>Something went wrong!</h1>
        <p data-test="error-message">
          {searchError.message}
        </p>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    const { status } = this.props;
    return (
      <Container fluid>
        {(isLoading) ? <PageLoading data-test="loading-page" /> : (status === 'error') ? <this.ShowError /> : <this.ShowResults />}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  accommodations: state.accommodation.searchResults,
  searchError: state.accommodation.searchError,
  status: state.accommodation.status,
});

export default withRouter(connect(mapStateToProps, { accommodationSearch })(SearchResults));
