import React from 'react';
import { shallow, mount } from 'enzyme';
import { SingleRequest, mapStateToProps } from '../../views/requests/SingleRequest';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import requestsMocks from '../mocks/requestsMocks';
import { checkManagerRequest } from '../../helpers/authHelper';
import CommentDisplay from '../../components/pages/requests/CommentDisplay';

const middlewares = [thunk];

const mainState = {
  requests: {
    dataError: null,
    data: null,
    singleData: null,
    editError: null,
    editData: null,
  }
}

const props = {
  props: {
    requests: {
      dataError: null,
      data: null,
      singleData: requestsMocks.itemPending,
    }
  },
  locations: {
    data: {
      data:[
        {
          country: 'Nigeria',
          id: 5,
          name: 'Lagos Office',
        },
        {
          country: 'Nigeria',
          id: 5,
          name: 'Lagos Office',
        }
      ]
    }
  },
  singleData: requestsMocks.itemPending,
  singleRequestAction: jest.fn(),
  processRequestAction: jest.fn(),
  singleRequestAction: jest.fn(),
  checkManagerRequest: jest.fn(() => true),
  match: {
    params: 2,
  }
  ,isDisabled: true,
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <SingleRequest {...props} store={store}/>
  );
  return wrapper;
}

describe('SingleRequest Test Suite', () => {
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    component.instance().processAction();
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      requests: {
        dataError: null,
        data: null,
        singleData: null,
        editError: null,
        editData: null,
      }
    };
    expect(mapStateToProps(initialState).singleData).toEqual(null);
  });

  it('should switch through status', async () => {
    const component = setUp(mainState);
    const renderStatusSpy = jest.spyOn(component.instance(), 'renderStatus');
    await component.instance().processAction('myActions', 1);
    component.instance().renderStatus({
      id: 1
    });
    component.instance().renderStatus({
      id: 3
    });
    component.instance().renderStatus({
      id: 2
    });
    expect(renderStatusSpy).toBeCalled();
  });

  
  it('Should test hundleChange', () => {
      const component = setUp(mainState); 
      const handleSubmitSpy = jest.spyOn(component.instance(), 'handleChange');
      const returnDate = { target: { name: 'returnDate', value: '20201-08-13' } };
      component.find('[data-test="returnDate-field"]').first().simulate('change', returnDate);
      component.find('[data-test="departureDate-field"]').first().simulate('click');
      component.find('Form').simulate('submit', {
     
        preventDefault() {},
      })
      component.instance().handleEdit({  preventDefault: jest.fn()});
      component.instance().handleCancel({  preventDefault: jest.fn()});   
    expect(handleSubmitSpy).toReturn();
    });

  });

  it('Should test handleDestinationChange', () => {
    const component = setUp(mainState); 
    component.setState({ destinations: [requestsMocks.itemPending] });
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleDestinationChange');
    const returnDate = { target: { name: 'returnDate', value: '20201-08-13' } };
    component.find('[data-test="returnDate-field"]').first().simulate('change', returnDate);
    component.find('[data-test="departureDate-field"]').first().simulate('click');
    component.find('Form').simulate('submit', {
      preventDefault() {},
    }); 
    component.instance().handleDestinationChange({ target: { id: 'returnDate-0', value: '20201-08-13' }, preventDefault: jest.fn()});
    expect(component.find('Col')).toHaveLength(9);
  });


  
