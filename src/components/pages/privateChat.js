/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Widget, addResponseMessage, addUserMessage,
} from 'react-chat-widget';
import socketIOClient from 'socket.io-client';
import user from '../../assets/images/user.png';
import { getPrivateChatHistory } from '../../actions/chatActions';
import 'react-chat-widget/lib/styles.css';
import isAuth from '../../helpers/isAuthenticated';
import moment from 'moment';

export class ChatWithsupplier extends React.Component {
  state={
    stateSocket: '',
    message: '',
    allMessages: [],
  }

  // eslint-disable-next-line react/sort-comp
  initChat = () => {
    const socket = socketIOClient.connect('https://caret-bn-backend-staging.herokuapp.com/', {
      query: `token=${localStorage.getItem('token')}`,
    });
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('privateChat', (data) => {
      const { allMessages } = this.state;
      const joined = allMessages.concat({
        text: data.message,
        sender: data.sender,
        type: 'received',
        time: moment().fromNow(),
      });
      this.setState({
        allMessages: joined,
      });
      const date = (moment().format('DD/MM/YYYY h:mm a'));
      addResponseMessage(`${data.message}\n\n\n\n\n  \t${date}`);
    });

    this.setState({
      stateSocket: socket,
    });
  };

  async componentDidMount() {
    const { props } = this;
    await props.getPrivateChatHistory();
    await this.initChat();
  }

  handleNewUserMessage = (message) => {
    const { id } = this.props;
    const date = (moment().format('DD/MM/YYYY h:mm a'));
    const { stateSocket } = this.state;
    stateSocket.emit('sendMessage', {
      message,
      date,
      target: {
        userId: id,
      },
    });
  }

  render() {
    const { AccommodationName, chatMessage } = this.props;
    const userInfo = isAuth();
    if (userInfo) {
      const { payload } = userInfo;
      const { id } = payload;
      if (chatMessage && chatMessage.length) {
        chatMessage.sort((a, b) => (a.id > b.id ? 1 : -1)).forEach((e) => {
          if (e.user.id === id) {
            addUserMessage(`${e.message}\n\n\n\n\n\n\n  \t ${(moment(`${e.createdAt}`).format('DD/MM/YYYY h:mm a'))}`);
          } else {
            addResponseMessage(`${e.user.username}\n\n\n ${e.message}\n\n\n\n\n  \t  ${(moment(`${e.createdAt}`).format('DD/MM/YYYY h:mm a'))}`);
          }
        });
      }
    }
    return (
    <Widget
      className="rcw-conversation-container"
      handleNewUserMessage={this.handleNewUserMessage}
      title={`Chat with ${AccommodationName}`}
      subtitle={false}
      profileAvatar={user}
      showCloseButton
      badge={0}
    />
    );
  }
}
ChatWithsupplier.propTypes = {
  getPrivateChatHistory: PropTypes.any,
  AccommodationName: PropTypes.string,
  chatMessage: PropTypes.object,
};
export const mapStateToProps = (state) => ({
  chatMessage: state.privateChat.chatMessage,
  chatError: state.privateChat.chatError,
});
export default connect(mapStateToProps, { addResponseMessage, getPrivateChatHistory })(ChatWithsupplier);
