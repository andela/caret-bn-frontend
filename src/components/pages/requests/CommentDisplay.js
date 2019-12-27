/* eslint-disable react/button-has-type */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import { sortArrayDesd as sortComments } from 'tesla-error-handler';
import { CloseIcon } from '@material-ui/icons/Close';
import {
  Container, Row, Col, Button, Form,
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

  actionSwitch = async (action, commentId) => {
    this.setState({
      isProcessing: true,
    });

    switch (action) {
      case 'delete':
        this.dispatchDeleteComment(commentId);
        break;
      default:
        this.dispatchRejectBooking(commentId);
    }
  }

  dispatchDeleteComment = async (commentId) => {
    const { requestId, deleteComment, getComment } = this.props;

    this.setState({
      operation: 'delete',
    });
    await deleteComment(commentId);
    await getComment(requestId);
    this.setState({
      isProcessing: false,
    });
  }

  editButton = (e) => {
    e.preventDefault();
    const { comment, id } = e.target;
    this.setState({ draftComment: comment, commentId: id }, () => {
      this.setState({ editMode: true });
    });
  }

  sendCommentEdit = async (e) => {
    e.preventDefault();
    const { requestId, getComment } = this.props;
    const { commentId, draftComment } = this.state;
    const comment = { comment: draftComment };
    await this.props.editComment(comment, commentId);
    await getComment(requestId);
    this.setState({ editMode: false });
  };

  closeEditMode = (e) => {
    e.preventDefault();
    this.setState({ draftComment: null, comment: '', editMode: false });
  };

  UNSAFE_componentWillReceiveProps(prevProps) {
    const { editData } = prevProps;
    if (editData === true) {
      this.setState({ draftComment: null, comment: '', editMode: false });
    }
  }

  render() {
    const {
      isLoading, openComment, comment, commentId, editMode, draftComment, loadingButton,
    } = this.state;
    const {
      data, commentData, editData, profile,
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
                 {profile && profile.image && <img src={this.props.profile.image} className="icon menu-photo" /> }
                 </span>
               </div>
                     <Form.Control as="textarea" rows="3" data-test="comment" type="text" className="form-control" onChange={this.handleChange} name="comment" placeholder="Enter a comment here" value={comment} required />
             </div>
             </div>
        </div>
        <Button type="submit">{loadingButton ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'Post Comment'}</Button>
        </form>
          <Row />
          <div className="request-item mb-3 p-3">
          {data && sortComments(data && data.data).map((element) => (
           <div data-test="commentcard" className="commentCard p-2" key={element.id}>
             <div className="d-flex mb-1">
             <img src={element.user.image} className="icon menu-photo" />
             <div className="d-flex flex-column ml-3">
              <p className="small py-0 mb-0 ">{element.user.username}</p>
              <p className="small py-0 mb-0 text-secondary"><small>{moment(element.updatedAt).fromNow()}</small></p>
             </div>
             </div>
             <div className="d-flex justify-content-between align-items-center">
              {editMode && commentId == element.id ? (
              <form className="w-100" onSubmit={this.sendCommentEdit}>
                <input type="text" className="form-control" name="draftComment" value={draftComment} onChange={this.handleChange} required />
              </form>
              ) : (
              <p className="font-weight-light w-100 m-0 p-0">{element.comment}</p>
              )}
              <div className="commentTrash d-flex m-0 p-1">
              { element.user.email === userInfo.payload.email
                ? (
                  <>
                  {editMode === true && commentId == element.id ? (
                    <button className="btn">
                    <img
                      onClick={(e) => {
                        this.closeEditMode(e);
                      }}
                      src={cancel}
                      alt=""
                      className="bodyIcons text-danger footerIconsRight edit"
                    />
                    </button>
                  ) : (
                    <button className="btn">
                    <img
                      onClick={(e) => {
                        e.target.comment = element.comment;
                        e.target.id = element.id;
                        this.editButton(e);
                      }}
                      src={edit}
                      alt=""
                      className="bodyIcons footerIconsRight edit"
                    />
                    </button>
                  )}
              <Confirm
                data-test="approve"
                variant="danger-outline"
                action="delete"
                id={element.id}
                processAction={this.actionSwitch}
                title={(
              <img
                src={trash}
                alt=""
                className="bodyIcons footerIconsRight trash"
              />
            )}
                size="sm"
                buttonClass="process-request-button btn-block"
              />
                  </>
                )
                : ''}
              </div>
             </div>
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
