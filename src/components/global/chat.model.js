import React from 'react';
import {
  Widget, addResponseMessage, addUserMessage,
} from 'react-chat-widget';
import moment from 'moment';
import user from '../../assets/images/user.png';

export default class ChatModel extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
  }

  componentDidMount() {
    this.renderMessages();
    console.log('re-mount');
  }

  handleNewUserMessage = (message) => {
    const { socket } = this.props;
    const id = localStorage.getItem('userId');
    socket.emit('sendMessage', {
      message,
      time: moment().fromNow(),
      target: {
        userId: id,
      },
    });
  }

  renderMessages = () => {
    const { data, id } = this.props;
    data.sort((a, b) => (a.id > b.id ? 1 : -1)).forEach((e) => {
      if (e.user.id === id) {
        addUserMessage(`${e.message}\n\n\n\n\n\n\n  \t ${(moment(`${e.createdAt}`).format('DD/MM/YYYY h:mm a'))}`);
      } else {
        addResponseMessage(`${e.user.username}\n\n\n ${e.message}\n\n\n\n\n  \t  ${(moment(`${e.createdAt}`).format('DD/MM/YYYY h:mm a'))}`);
      }
    });
  }

  render() {
    // this.renderMessages();
    return (
      <Widget
        className="rcw-conversation-container"
        handleNewUserMessage={this.handleNewUserMessage}
        title="Chat with client"
        subtitle="Give your response"
        profileAvatar={user}
        showCloseButton
        badge={0}
      />
    );
  }
}
