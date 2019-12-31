/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Add } from '@material-ui/icons';
import StarRatings from 'react-star-ratings';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { checkSupplier } from '../../helpers/authHelper';
import { GetAllAccommodation, likeUnlikeAccommodation } from '../../actions/accommodationActions';
import Breadcrumbs from '../global/Breadcrumbs';
import isAuthenticated from '../../helpers/isAuthenticated';

export class AllAccommodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userId: null,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const userInfo = isAuthenticated();
    await this.props.GetAllAccommodation();
    this.setState({ isLoading: false });
    this.renderAcommodation = this.renderAcommodation.bind(this);
    await this.setState({
      userId: userInfo.payload.id,
    });
  }

  async handleLike(slug, action) {
    const { likeUnlikeAccommodation, GetAllAccommodation } = this.props;
    await GetAllAccommodation();
    await likeUnlikeAccommodation(slug, action);
  }

  async handleDislike(slug, action) {
    const { likeUnlikeAccommodation, GetAllAccommodation } = this.props;
    await GetAllAccommodation();
    await likeUnlikeAccommodation(slug, action);
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
                {post.hasLiked ? <ThumbUpAltIcon className="like-button" /> : <ThumbUpOutlinedIcon className="like-button" onClick={() => this.handleLike(post.slug, 'like')} />}
                {' '}
                {`${post.Likes} Likes`}
              </h2>
              <h2 md={4} className="dislike">
                {post.hasUnliked ? <ThumbDownAltIcon className="dislike-button" /> : <ThumbDownOutlinedIcon className="dislike-button" onClick={() => this.handleDislike(post.slug, 'unlike')} />}
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
});

export default connect(mapStateToProps, { GetAllAccommodation, likeUnlikeAccommodation })(AllAccommodation);
