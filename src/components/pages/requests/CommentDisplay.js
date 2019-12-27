import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { sortArrayDesd as sortComments } from 'tesla-error-handler';
import {
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import 'react-day-picker/lib/style.css';
import { setComment, getComment } from '../../../actions/commentAction';
import { singleRequestAction } from '../../../actions/requestsActions';

export class CommentDisplay extends Component {
  state = {
    isLoading: false,
    openComment: false,
    comment: '',
    loadingButton: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount = async () => {
    const { requestId } = this.props;
    await this.props.getComment(requestId);
  }

  hideComment = () => {
    const { state: { openComment } } = this;
    this.setState((state) => ({ ...state, openComment: !openComment }));
  };

  handleSubmit = async (e) => {
    const { props } = this;
    const { requestId, singleRequestAction } = this.props;
    e.preventDefault();
    const {
      comment,
    } = this.state;
    const userComment = {
      comment,
    };

    this.setState({ comment: '', loadingButton: true });
    await props.setComment(userComment, requestId);
    this.setState({ loadingButton: false });
    await props.singleRequestAction(requestId);
    await this.props.getComment(requestId);
  };

  render() {
    const {
      isLoading, openComment, comment, loadingButton,
    } = this.state;
    const { data, commentData, profile } = this.props;

    return (
      <>
        <div className="search-box py-3">
        <Container>
        <Col xs={12} sm={6} md={4} lg={4}>
          <Button data-test="comment-view" className="full-width-buttons" style={{ width: '100%' }} onClick={() => this.hideComment()}>
           Comments
          </Button>
        </Col>
        </Container>
      { openComment && (
        <div className="search-bar">
         <form className="mt-3 px-4" onSubmit={this.handleSubmit}>
         <div className="form-group row p-0 mb-0">
              <div className="col-sm-12">
              <div className="input-group shadow-sm mb-3 mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white p-1" id="basic-addon1">
                  {profile && profile.image && <img src={this.props.profile.image} className="icon menu-photo" /> }
                  </span>
                </div>
                      <Form.Control as="textarea" rows="3" data-test="comment" type="text" className="form-control" onChange={this.handleChange} name="comment" placeholder="Enter a comment here" value={comment} required />
              </div>
              </div>
         </div>
         <Button type="submit">{loadingButton ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'Post Comment'}</Button>
         </form>
          <div className="request-item mb-3 p-3">
          {data && sortComments(data && data.data).map((element) => (
           <div data-test="commentcard" className="commentCard" key={element.id}>
             <div className="d-flex mb-3">
             <img src={element.user.image} className="icon menu-photo" />
             <div className="d-flex flex-column ml-3">
              <p className="small py-0 mb-0 ">{element.user.username}</p>
              <p className="small py-0 mb-0 text-secondary"><small>{moment(element.createdAt).fromNow()}</small></p>
             </div>
             </div>
             <p className="font-weight-light">{element.comment}</p>
           </div>
          ))}
          </div>
        </div>
      )}
        </div>
        <Container>
          <Row className="text-center mx-auto">
            {isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : ''}
          </Row>
        </Container>
      </>
    );
  }
}

CommentDisplay.propTypes = {
  setComment: PropTypes.func.isRequired,
  getComment: PropTypes.func.isRequired,
  locations: PropTypes.any,
};

export const mapStateToProps = (state) => ({
  dataError: state.requestComment.dataError,
  data: state.requestComment.data,
  commentError: state.requestComment.commentError,
  commentData: state.requestComment.commentData,
  status: state.requestComment.status,
  profile: state.profile.data.profile,
});

export default connect(mapStateToProps, { setComment, getComment, singleRequestAction })(CommentDisplay);
