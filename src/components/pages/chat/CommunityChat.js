/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import {
  Form, InputGroup, FormControl, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Messages from './Messages';
import { getChatHistory } from '../../../actions/chatActions';

class CommunityChat extends Component {
  state={
    stateSocket: '',
    message: '',
    allMessages: [],
    activeHistoryButton: true,
  }

initChat = () => {
  const socket = socketIOClient.connect('https://caret-bn-backend-staging.herokuapp.com/', {
    query: `token=${localStorage.getItem('token')}`,
  });

  socket.on('chatMessage', (data) => {
    const { allMessages } = this.state;
    const all = allMessages.concat({
      text: data.message,
      sender: `${data.sender}: `,
      type: 'received',
    });
    this.setState({
      allMessages: all,
    });
  });

  this.setState({
    stateSocket: socket,
  });
};

componentDidMount = async () => {
  const { getChatHistory } = this.props;

  this.initChat();
  await getChatHistory();
  await this.seeChatHistory();
}

seeChatHistory = async () => {
  const { chatHistory, userData } = this.props || [];
  const { allMessages } = this.state;
  const { profile } = userData || null;
  const myUsername = profile.username;

  await getChatHistory();
  const chatMessages = allMessages.concat(
    chatHistory.data.sort((latest, oldest) => (latest.id - oldest.id)).map((item) => ({
      text: item.message,
      sender: item.user.username,
      type: (item.user.username === myUsername) ? 'sent' : 'received',
    })),
  );
  this.setState({ allMessages: chatMessages, activeHistoryButton: false });
}

handleChange = async (e) => {
  e.preventDefault();
  const { name, value } = e.target;
  this.setState({
    [name]: value,
  });
}

sendMessage = (e) => {
  e.preventDefault();
  const { message, stateSocket, allMessages } = this.state;
  stateSocket.emit('sendMessage', {
    message,
    target: {
      userId: false,
    },
  });
  const all = allMessages.concat({
    text: message,
    sender: 'Me:',
    type: 'sent',
  });
  this.setState({
    allMessages: all,
    message: '',
  });
}

render() {
  const { allMessages, activeHistoryButton, message } = this.state;

  const messageContainerStyle = (type) => ({
    display: 'flex',
    width: '98.5%',
    padding: '10px',
    justifyContent: (type === 'sent' ? 'flex-end' : 'flex-start'),
  });
  const messageStyle = (type) => ({
    backgroundColor: (type === 'sent' ? '#0890bf' : '#148799'),
    margin: '0 10px',
    padding: '5px',
    color: '#fff',
    borderRadius: '5px',
    flex: 0.5,
  });

  return (
    <div className="chatRoom">
      <div className="chatWindowStyle mt-0 mb-5" id="chat-window">
        {
          allMessages.map((message, i) => (
              <Messages
                key={i}
                render={() => (
                <div style={messageContainerStyle(message.type)}>
                  <div style={messageStyle(message.type)}>
                    <h6 style={{ margin: '5px 0' }}>{message.sender}</h6>
                    <p style={{ fontSize: '15px' }}>{message.text}</p>
                  </div>
                </div>
                )}
              />
          ))
        }
      </div>
      <div className="fixed-bottom">
          <Form className="inputStyles">
            <InputGroup>
            {activeHistoryButton ? <Button onClick={this.seeChatHistory}>See history</Button> : null }
              <FormControl className="chat-message" data-test="message" placeholder="Type your message here..." name="message" onChange={this.handleChange} value={this.state.message} className="normal-input" style={{ flex: '2', margin: '0 5px 0 0' }} required />
                <InputGroup.Append>
                  <Button
                    type="submit"
                    className="button-normal"
                    onClick={this.sendMessage}
                    style={{ flex: '.5' }}
                    disabled={(message === '')}
                  >
                  Send
                  </Button>
                </InputGroup.Append>
            </InputGroup>
          </Form>
      </div>
    </div>
  );
}
}

CommunityChat.propTypes = {
  getChatHistory: PropTypes.func,
  chatHistory: PropTypes.array,
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  chatHistory: state.chat.chatHistory,
  chatHistoryError: state.chat.chatHistoryError,
  userData: state.profile.data,
});

export default connect(mapStateToProps, { getChatHistory })(CommunityChat);
