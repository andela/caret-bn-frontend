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


export default function deactivatedListItem(props) {
  const {
    post, handleLike, handleDislike, userId,
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
            <Row className="center-items like-disklike">
              <span md={4} className="like">
                {post.hasLiked ? <ThumbUpAltIcon className="like-button" data-test="like-button" /> : <ThumbUpOutlinedIcon className="like-button" data-test="like-button" onClick={() => handleLike(post.slug, 'like')} />}
                {' '}
                {`${post.Likes} Likes`}

              </span>
              <span md={4} className="dislike">
                {post.hasUnliked ? <ThumbDownAltIcon className="dislike-button" data-test="dislike-button" /> : <ThumbDownOutlinedIcon className="dislike-button" data-test="dislike-button" onClick={() => handleDislike(post.slug, 'unlike')} />}
                {' '}
                {`${post.Unlikes} Dislikes`}
              </span>
            </Row>
            <Row className="acc-buttons">
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
