import React from 'react';
import { shallow } from 'enzyme';
import { Confirm } from '../../components/global/Confirm';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import { Button } from 'react-bootstrap';
import requestsMocks from '../mocks/requestsMocks';

const middlewares = [thunk];

const mainState = {};

const props = {
  props: {
    id: 2,
    title: "approve",
    variant: 'success',
    action: 'approve',
    size: "md",
    buttonClass: "btn-block",
    processAction: jest.fn(),
  },
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <Confirm {...props} store={store} />
  );
    return wrapper;
} 

describe('Confirm Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    expect(component.dive().find(Button)).toHaveLength(3);
  });
  
  it('Should Click the button', () => {
    const component = setUp(mainState);
    const processSpy = jest.spyOn(component.instance(), 'confirmAction');
    component.dive().find('[data-test="confirm-yes"]').simulate('click');
    expect(processSpy).toReturn();
  });
});
