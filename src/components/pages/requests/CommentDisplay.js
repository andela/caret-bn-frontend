/* eslint-disable react/button-has-type */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortArrayDesd as sortComments } from 'tesla-error-handler';
import {
  Container, Row, Col, Button, Form, Spinner,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import 'react-day-picker/lib/style.css';
import {
  setComment, getComment, deleteComment, editComment,
} from '../../../actions/commentAction';
import { singleRequestAction } from '../../../actions/requestsActions';
import trash from '../../../assets/images/trash.svg';
import edit from '../../../assets/images/edit.png';
import cancel from '../../../assets/images/cancel.jpg';
import isAuthenticated from '../../../helpers/isAuthenticated';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Confirm from '../../global/Confirm';
import { CommentItem } from './CommentItem';

export class CommentDisplay extends Component {
  state = {
    isLoading: false,
    openComment: false,
    comment: '',
    isProcessing: false,
    editMode: false,
    commentId: null,
    draftComment: null,
    loadingButton: false,
    loadingButtonEdit: false,
    deleteLoading: false,
  };

  // eslint-disable-next-line react/sort-comp
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount = async () => {
    this.retrieveComment();
  }

  retrieveComment = async () => {
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
    const userData = {
      comment,
    };
    this.setState({ comment: '', loadingButton: true });
    await props.setComment(userData, requestId);
    this.setState({ loadingButton: false });
    await props.singleRequestAction(requestId);
    await this.props.getComment(requestId);
  };

  render() {
    const {
      isLoading, openComment, comment, commentId, editMode, draftComment, loadingButton, loadingButtonEdit, deleteLoading,
    } = this.state;
    const {
      data, commentData, editData, profile, requestId,
    } = this.props;
    const userInfo = isAuthenticated();

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
                 {profile &&  <img src={this.props.profile.image || 'https://via.placeholder.com/450'} className="icon menu-photo" /> }
                 </span>
               </div>
                     <Form.Control as="textarea" rows="3" data-test="comment" type="text" className="form-control" onChange={this.handleChange} name="comment" placeholder="Enter a comment here" value={comment} required />
             </div>
             </div>
        </div>
        <Button type="submit">{loadingButton ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'Post'}</Button>
        </form>
          <Row />
          <div className="request-item mb-3 p-3">
          {data && sortComments(data && data.data).map((element) => (
            <CommentItem userInfo={userInfo} requestId={requestId} element={element} editComment={this.props.editComment} deleteComment={this.props.deleteComment} getComment={this.props.getComment} />
          ))}
          </div>
        </div>
      )}
        </div>
        <Container>
            {isLoading ? (
<div className="d-flex justify-content-center">
        <Spinner animation="grow" size="lg" variant="primary" />
</div>
            ) : ''}
        </Container>
      </>
    );
  }
}

CommentDisplay.propTypes = {
  setComment: PropTypes.func.isRequired,
  getComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  locations: PropTypes.any,
  editComment: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  dataError: state.requestComment.dataError,
  data: state.requestComment.data,
  commentError: state.requestComment.commentError,
  commentData: state.requestComment.commentData,
  deleteData: state.requestComment.deleteData,
  deleteError: state.requestComment.deleteError,
  editData: state.requestComment.editData,
  editError: state.requestComment.editError,
  status: state.requestComment.status,
  profile: state.profile.data.profile,
});

export default connect(mapStateToProps, {
  setComment, getComment, deleteComment, singleRequestAction, editComment,
})(CommentDisplay);
