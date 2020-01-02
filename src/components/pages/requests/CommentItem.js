/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';
import {
  getComment, deleteComment, editComment,
} from '../../../actions/commentAction';
import { singleRequestAction } from '../../../actions/requestsActions';
import Confirm from '../../global/Confirm';
import trash from '../../../assets/images/trash.svg';
import edit from '../../../assets/images/edit.png';
import cancel from '../../../assets/images/cancel.jpg';
import isAuthenticated from '../../../helpers/isAuthenticated';

export class CommentItem extends Component {
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

    UNSAFE_componentWillReceiveProps(prevProps) {
      const { editData } = prevProps;
      if (editData === true) {
        this.setState({ draftComment: null, comment: '', editMode: false });
      }
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    };

    actionSwitch = async (action, commentId) => {
      this.setState({
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
        deleteLoading: true,
      });
      await this.props.deleteComment(commentId);
      this.setState({
        deleteLoading: false,
      });
      await this.props.getComment(requestId);
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

      this.setState({ loadingButtonEdit: true });
      await this.props.editComment(comment, commentId);
      await this.props.getComment(requestId);
      this.setState({ editMode: false, loadingButtonEdit: false });
    };

    closeEditMode = (e) => {
      e.preventDefault();
      this.setState({ draftComment: null, comment: '', editMode: false });
    };


    render() {
      const { element, userInfo } = this.props;

      const {
        isLoading, openComment, comment, commentId, editMode, draftComment, loadingButton, loadingButtonEdit, deleteLoading,
      } = this.state;

      return (
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
                <Button type="submit">{loadingButtonEdit ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'save'}</Button>
              </form>
              ) : (
              <p className="font-weight-light w-100 m-0 p-0">{deleteLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : element.comment}</p>
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
                      className="bodyIcons trash"
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
      );
    }
}
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
  getComment, deleteComment, singleRequestAction, editComment,
})(CommentItem);
