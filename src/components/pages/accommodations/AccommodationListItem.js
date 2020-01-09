/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Row, Card, Col, Button, Badge,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import {
  LocationOn, StarBorderOutlined, Star,
} from '@material-ui/icons';
import BookMark from './BookMark';
import { checkHost, checkTravel } from '../../../helpers/authHelper';

export default function accommodationListItem(props) {
  const {
    post, handleLike, handleDislike, userId, isActivated,
  } = props;

  return (
    <Row className="center-items" key={post.id}>
      <Card key={post.id} className="accommodation-card">
        <Row className="p-3">
          <Col className="acc-image">
            <img src={(typeof (post.images) === 'string') ? post.images : post.images[0]} alt="accommodation" />
          </Col>
          <Col className="info-container">
            <Row className="name-holder">
              <Link to={`/accommodations/${post.slug}`}>
                <p className="accommodation-name">{post.name}</p>
              </Link>
              <BookMark hasBookmarked={post.hasBookmarked} slug={post.slug} />
            </Row>
            <Row className="bookmark-locale">
              <p className="acc-locale">
                <LocationOn />
                {' '}
                {post.accommodationLocation.name}
              </p>
            </Row>
            <Row className="acc-pricing-details">
              <Badge variant="info">
                {post.availableSpace}
                &nbsp;
                Rooms available
              </Badge>
              <span className="acc-pricing">
                <span className="cost">
                  {post.currency}
                  {' '}
                  {post.cost.toFixed(2)}
                  {' '}
                </span>
                <span className="unit">
                  {' '}
                  {' '}
                  per night
                </span>
              </span>
            </Row>
            <Row className="star-ratings">
              <StarRatings
                rating={post.averageRating}
                starRatedColor="#e99434"
                numberOfStars={5}
                name="rating"
                starEmptyColor="F5F1F1"
                starDimension="20px"
              />
              <span xs={12} sm={12} lg={12} md={12} className="average-rating">
                <Badge variant="primary">
                  {post.averageRating.toFixed(1)}
                </Badge>
                <span>
                  {' '}
                  from
                  {' '}
                  {post.ratings.length}
                  {' '}
                  rating(s)
                </span>
              </span>
            </Row>
            <Row className="center-items like-disklike" data-test="Row">
                <span md={4} className="like or">
                  {checkHost() ? null : post.hasLiked ? <ThumbUpAltIcon className="like-button or" data-test="like-button" /> : <ThumbUpOutlinedIcon className="like-button o" data-test="like-button" onClick={() => handleLike(post.slug, 'like')} />}
                  {' '}
                  {`${post.Likes} Likes`}
                </span>
                <span md={4} className="dislike">
                  {checkHost() ? null : post.hasUnliked ? <ThumbDownAltIcon className="dislike-button" data-test="dislike-button" /> : <ThumbDownOutlinedIcon className="dislike-button" data-test="dislike-button" onClick={() => handleDislike(post.slug, 'unlike')} />}
                  {' '}
                  {`${post.Unlikes} Dislikes`}
                </span>
            </Row>
            <Row className="acc-buttons">
              <Link to={`/accommodations/${post.slug}`}>
                {

                !checkHost() ? (post.isActivated)
                  ? (
                    <Button className="full-width-buttons mb-md-2 mb-2">
                                      Book accommodation
                    </Button>
                  )
                  : null : null
                }
              </Link>

              <Link to={{
                pathname: `/accommodations/${(post.isActivated) ? 'deactivate' : 'activate'}/${post.slug}`,
                state: {
                  action: (post && post.isActivated) ? 'Deactivate' : 'Activate',
                },
              }}
              >
                {!checkTravel() ? null
                  : post.isActivated === true
                    ? (
                      <Button className="full-width-buttons accent-button">
                        Deactivate accomodation
                      </Button>
                    ) : (
                      <Button className="full-width-buttons accent-button">
                          Activate accomodation
                      </Button>
                    )}
              </Link>
              {
                ((post.ownerUser ? post.ownerUser.id : post.owner) === userId)
                  ? (
                    <Link to={{ pathname: `/accommodations/${post.slug}/edit` }}>
                      <Button varian="warning" className="full-width-buttons">
                        Edit
                      </Button>
                    </Link>
                  )
                  : null
              }
            </Row>
          </Col>
        </Row>
      </Card>
    </Row>
  );
}
