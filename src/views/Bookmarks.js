/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card, Container, Button, Row, Badge, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LocationOnOutlined, StarBorderOutlined } from '@material-ui/icons';
import { getBookmarks } from '../actions/bookmarkActions';
import PageLoading from '../components/global/PageLoading';
import BookMark from '../components/pages/accommodations/BookMark';

class Bookmarks extends Component {
  state = {
    isLoading: true,
  }

  componentDidMount = async () => {
    const { getBookmarks } = this.props;
    this.setState({
      isLoading: true,
    });
    await getBookmarks();
    this.setState({
      isLoading: false,
    });
  }

  showBookmarks = () => {
    const { bookmarks: { data } } = this.props;
    return (
      (data && data.length > 0)
        ? (
          <Container style={{ padding: '10px ' }} fluid data-test="bookmark-container">
            <Row className="center-items">
              <h1>Your Bookmarks</h1>
            </Row>
            <Row className="bookmark-row">
              {data.map((bookmark) => (
                <Card className="bookmark-card">
                  <div className="card-img-top">
                    <img
                      alt="accommodation"
                      className="bookmark-image"
                      variant="top"
                      src={(typeof (bookmark.accommodation.images) === 'string')
                        ? bookmark.accommodation.images : bookmark.accommodation.images[0]}
                    />
                    <div className="top-right-close">
                      <BookMark hasBookmarked reloadAction={this.componentDidMount} slug={bookmark.accommodation.slug} closeRequired />
                    </div>
                  </div>
                  <Card.Body>
                    <Row className="center-items">
                      <Card.Title className="bookmarks-title">
                        {bookmark.accommodation.name}
                      </Card.Title>
                    </Row>
                    <Row className="center-items bookmarks-availability">
                      <Badge variant="info">
                        {bookmark.accommodation.availableSpace}
                        &nbsp;
                        Rooms available
                      </Badge>
                      <span className="acc-pricing bookmarks-pricing">
                        <span className="cost">
                          {bookmark.accommodation.currency}
                          {' '}
                          {bookmark.accommodation.cost.toFixed(2)}
                          {' '}
                        </span>
                        <span className="unit">
                          {' '}
                          {' '}
                          per night
                        </span>
                      </span>
                    </Row>
                    <Row className="bookmarks-location">
                      <LocationOnOutlined />
                      {bookmark.accommodation.accommodationLocation.name}
                    </Row>
                    <Row className="center-items bookmarks-button">
                      <Link to={`/accommodations/${bookmark.accommodation.slug}`}>
                        <Button className="full-width-buttons">View Accommodation</Button>
                      </Link>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </Container>
        )
        : (
          <Container fluid data-test="loader-container">
            <Row className="bookmark-not-found">
              <p className="not-found-title">No Bookmarks</p>
              <p className="not-found-help-text">
                Add bookmarks by clicking the
                {' '}
                <StarBorderOutlined style={{ color: '#FFB404' }} fontSize="large" />
                {' '}
                icon on the accommodations page
              </p>
            </Row>
          </Container>
        )
    );
  }

  render() {
    const { isLoading } = this.state;
    const { status, bookmarks } = this.props;
    return (
      <div>
        {
          (isLoading) ? <PageLoading data-test="isLoading" /> : <this.showBookmarks data-test="show-bookmarks" />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bookmarks: state.bookmarks.data,
  status: state.bookmarks.status,
  error: state.bookmarks.dataError,
});

Bookmarks.propTypes = {
  getBookmarks: PropTypes.func.isRequired,
  bookmarks: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getBookmarks })(Bookmarks);
