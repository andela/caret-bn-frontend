/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import {
  Form, InputGroup, FormControl, Button, Col, Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Send, EmojiEmotionsOutlined } from '@material-ui/icons';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import Messages from './Messages';
import { getChatHistory } from '../../../actions/chatActions';
import Breadcrumbs from '../../global/Breadcrumbs';

class CommunityChat extends Component {
  state={
    stateSocket: '',
    message: '',
    allMessages: [],
    activeHistoryButton: true,
    displayEmoji: false,
  }

bottomOfChat = React.createRef();

initChat = () => {
  const socket = socketIOClient.connect('https://caret-bn-backend-staging.herokuapp.com/', {
    query: `token=${localStorage.getItem('token')}`,
  });

  socket.on('chatMessage', (data) => {
    const { allMessages } = this.state;
    const all = allMessages.concat({
      text: data.message,
      sender: `${data.sender}`,
      type: 'received',
      time: moment().calendar(),
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
      sender: (item.user.username === myUsername) ? 'Me' : item.user.username,
      type: (item.user.username === myUsername) ? 'sent' : 'received',
      time: moment(`${item.createdAt}`).format('DD/MM/YYYY h:mm a'),
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

toggleEmoji = () => {
  this.setState((state) => ({ ...state, displayEmoji: !this.state.displayEmoji }));
}

hideEmoji = () => {
  this.setState((state) => ({ ...state, displayEmoji: false }));
}

addEmoji = (e) => {
  const emoji = e.native;
  this.setState((state) => ({ ...state, message: this.state.message + emoji }));
  this.hideEmoji();
}

sendMessage = async (e) => {
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
    sender: 'Me',
    type: 'sent',
    time: moment().calendar(),
  });
  await this.setState({
    allMessages: all,
    message: '',
  });
  this.scrollToBottom();
  this.hideEmoji();
}

scrollToBottom() {
  this.bottomOfChat.current.scrollIntoView();
}

render() {
  document.title = 'Barefoot Nomad - Chat';
  const {
    allMessages, activeHistoryButton, message, displayEmoji,
  } = this.state;

  return (
    <>
    <Row>
      <Col md={3} className="breadcrumbs">
        <Breadcrumbs itemsArray={['> Chat', 'Community Chat']} />
      </Col>
    </Row>
    <div className="chatRoom ">
      <div className="chatWindowStyle">
      <div className="d-flex flex-column mt-0 mb-5" id="chat-window" onClick={this.hideEmoji}>
        {
          allMessages.map((message, i) => (
              <Messages
                key={i}
                render={() => (
                <div className={(message.type === 'sent') ? 'sent-message-box' : 'received-message-box'}>
                  <div className="d-flex flex-column" className={(message.type === 'sent') ? 'sent-message' : 'received-message'}>
                    <h6 style={{ margin: '3px 0', fontWeight: 'bolder', color: '#073763' }}>{message.sender}</h6>
                    <p style={{ fontSize: '15px' }}>{message.text}</p>
                    <p style={{ textAlign: 'right', fontSize: '0.5rem', marginBottom: '0.5rem' }}>{message.time}</p>
                  </div>
                  <div ref={this.bottomOfChat} />
                </div>
                )}
              />
          ))
        }
      </div>
      <div className="messabe-box">
        {displayEmoji && <Picker title="Pick your emoji…" emoji="point_up" onSelect={(e) => this.addEmoji(e)} />}
        <Form>
          <InputGroup>
          {activeHistoryButton ? <Button onClick={this.seeChatHistory}>See history</Button> : null }
            <InputGroup.Prepend>
              <InputGroup.Text>
                <EmojiEmotionsOutlined onClick={this.toggleEmoji} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="chat-message" data-test="message" placeholder="Type your message here..." name="message" onChange={this.handleChange} value={this.state.message} onClick={this.hideEmoji} required />
            <InputGroup.Append>
              <Button
                data-test="chat-send"
                type="submit"
                className=""
                onClick={this.sendMessage}
                style={{ flex: '.5' }}
                disabled={(message === '')}
                variant="primary"
              >
              <Send />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
      </div>
    </div>
    </>
  );
}
}

CommunityChat.propTypes = {
  getChatHistory: PropTypes.func,
  chatHistory: PropTypes.array,
  userData: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  chatHistory: state.chat.chatHistory,
  chatHistoryError: state.chat.chatHistoryError,
  userData: state.profile.data,
});

export default connect(mapStateToProps, { getChatHistory })(CommunityChat);
