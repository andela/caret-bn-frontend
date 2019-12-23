import React from 'react';
import { shallow } from 'enzyme';
import { ProcessRequest, mapStateToProps } from '../../components/pages/requests/ProcessRequest';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import { Button } from 'react-bootstrap';
import requestsMocks from '../mocks/requestsMocks';

const middlewares = [thunk];

const mainState = {
  processRequest: {
    processDataError: null,
    processData: null,
    status: '',
  },
}

const props = {
  props: {
    id: 2,
    variant: 'success',
    action: 'approve',
  },
  processRequest: {
    processDataError: null,
    processData: null,
    status: '',
  },
  processRequestAction: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <ProcessRequest {...props} store={store} />
  );
    return wrapper;
} 

describe('Process Request Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    expect(component.find(Button)).toHaveLength(1);
  });

  it('Should Click the button', () => {
    const component = setUp(mainState);
    const processSpy = jest.spyOn(component.instance(), 'processAction');
    component.find('[data-test="process-request-button"]').simulate('click');
    expect(component.find(Button)).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      processRequest: {
        processDataError: null,
        processData: null,
        status: '',
      },
    };
    expect(mapStateToProps(initialState).processRequest.processData).toEqual(null);
  });
});
