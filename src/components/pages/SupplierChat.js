/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Widget, addResponseMessage, addUserMessage, toggleWidget, dropMessages,
} from 'react-chat-widget';
import socketIOClient from 'socket.io-client';
import user from '../../assets/images/user.png';
import 'react-chat-widget/lib/styles.css';
import { getPrivateChatHistory } from '../../actions/chatActions';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment';
import isAuth from '../../helpers/isAuthenticated';

export class SupplierChat extends React.Component {
  state={
    stateSocket: '',
    message: '',
    active: '',
    userName: '',
    allMessages: [],
  }

  async componentDidMount() {
    const { props } = this;
    await props.getPrivateChatHistory();

    await this.initChat();
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

  handleNewUserMessage = (message) => {
    const { stateSocket } = this.state;
    const id = localStorage.getItem('userId');
    stateSocket.emit('sendMessage', {
      message,
      time: moment().fromNow(),
      target: {
        userId: id,
      },
    });
  }

  render() {
    const { chatMessage } = this.props;
    const { active, userName } = this.state;
    const groupBy = (data, id) => {
      const unique = [...new Set(data.map((e) => (e.user.id === id ? `${e.receiver.username},${e.receiver.id}` : `${e.user.username},${e.user.id}`)))];
      const obj = {};
      unique.forEach((e) => (obj[e] = []));
      data.forEach((e) => {
        obj[e.user.id === id ? `${e.receiver.username},${e.receiver.id}` : `${e.user.username},${e.user.id}`].push(e);
      });
      return obj;
    };

    const userInfo = isAuth();
    if (userInfo) {
      const { payload } = userInfo;
      const { id } = payload;

      const userClicked = (user) => {
        localStorage.removeItem('userId');
        localStorage.setItem('userId', parseInt(user.split(',')[1], 10));
        this.setState({ active: user, userName: user.split(',')[0] });
        toggleWidget();
        dropMessages();
      };
      const usersChat = chatMessage && chatMessage.length && Object.keys(groupBy(chatMessage, id));
      const usersChatMessage = chatMessage && chatMessage.length && groupBy(chatMessage, id);

      if (chatMessage && chatMessage.length) {
        (usersChatMessage[active] || []).sort((a, b) => (a.id > b.id ? 1 : -1)).forEach((e) => {
          if (e.user.id === id) {
            addUserMessage(`${e.message}\n\n\n\n\n\n\n  \t ${(moment(`${e.createdAt}`).format('DD/MM/YYYY h:mm a'))}`);
          } else {
            addResponseMessage(`${e.user.username}\n\n\n ${e.message}\n\n\n\n\n  \t  ${(moment(`${e.createdAt}`).format('DD/MM/YYYY h:mm a'))}`);
          }
        });
      }

      const users = chatMessage && chatMessage.length && usersChat.map((user) => (
      <div key={parseInt(user.split(',')[1], 10)}>
     <ListGroup.Item as="li" action onClick={(e) => userClicked(user)}>{user.split(',')[0]}</ListGroup.Item>
      </div>
      ));

      return (
      <div className="chats-users">
      <ListGroup as="ul" />
      <ListGroup.Item as="li">
        Users
      </ListGroup.Item>
         {users}
      <Widget
        className="rcw-conversation-container"
        handleNewUserMessage={this.handleNewUserMessage}
        addUserMessage={this.addUserMessage}
        title={`Chat with ${userName}`}
        subtitle={false}
        profileAvatar={user}
        showCloseButton
        badge={0}
      />
      </div>
      );
    }
  }
}
SupplierChat.propTypes = {
  getPrivateChatHistory: PropTypes.func,
  chatMessage: PropTypes.object,
};
export const mapStateToProps = (state) => {
  return ({
    chatMessage: state.privateChat.chatMessage,
    chatError: state.privateChat.chatError,
  });
};
export default connect(mapStateToProps, { addResponseMessage, addUserMessage, getPrivateChatHistory })(SupplierChat);
