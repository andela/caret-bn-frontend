import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Form } from "react-bootstrap";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import sinon from "sinon";
import CommunityChat from '../../components/pages/chat/CommunityChat';
import findByTestAttribute from '../../utilities/tests/findByTestAttribute';
import mockStore from '../../utilities/tests/mockStore';

jest.mock('axios');

const makeWrapper = (props) => {
  const storeData = mockStore({
    chat: {
      chatHistory: { data: { id: 1, message: 'Hey', user: { id: 8, email: "caretmanager@gmail.com" } } },
      chatHistoryError: null,
    },
    profile: {
      userData: {id:1, username: 'user1'},
    },
  });
  return shallow(
        <CommunityChat.WrappedComponent store={storeData} {...props} />
  ).setState({
      allMessage: [],
      activeHistoryButton: true
  })
}
describe('Chat component test suite', () => {
    it('Should handle change', async () => {
        let wrapper = makeWrapper({
            getChatHistory: jest.fn(),
            userData: {
                profile: {
                    username: 'Person'
                }
            },
            chatHistory: {
                data: [
                    {
                        id: 1,
                        user: {
                            username: 'Person',
                        },
                        message: 'My message'
                    },
                    {
                        id: 2,
                        user: {
                            username: 'people',
                        },
                        message: 'peoples message'
                    },
                    
                ]
            }
        });

        const messageInput = findByTestAttribute(wrapper, 'message');
         messageInput.simulate('change', { target: {name: 'message', value: 'hello'},  preventDefault: jest.fn()});
        expect(wrapper.state().message).toBe('hello');
    });
});
