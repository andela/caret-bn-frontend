import React from 'react';
import { shallow } from 'enzyme';
import { ManagerView, mapStateToProps } from '../views/manager/ManagerView';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import requestsMocks from './mocks/requestsMocks';

const middlewares = [thunk];
const mainState = {
  requests: {
    dataError: null,
    data: null,
    singleData: null,
  },
  managerSearchRequest: {
    status: '',
    managerSearchData: null,
    managerSearchDataError: null,
  }
}

const props = {
  props: requestsMocks.managerViewRequestsProps,
  managerSearchRequest: {
    status: '',
    managerSearchData: null,
    managerSearchDataError: null,
  },
  data: {
    data: [
      {
        username: 'username',
        email: 'email@gmail.com',
        requests: [requestsMocks.itemPending, requestsMocks.itemApproved],
      },
      {
        username: 'username',
        email: 'email@gmail.com',
        requests: [requestsMocks.itemPending, requestsMocks.itemApproved],
      },
      {
        username: 'username',
        email: 'email@gmail.com',
        requests: [requestsMocks.itemPending, requestsMocks.itemApproved],
      },
      {
        username: 'username',
        email: 'email@gmail.com',
        requests: [requestsMocks.itemPending, requestsMocks.itemApproved],
      },
    ],
  },
  getRequestsAction: jest.fn(),
  cancelResetPageAction: jest.fn(),
  getManagerRequestAction: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <ManagerView {...props}   store={store} />
  );
    return wrapper;
} 

describe('ManagerView Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    component.setState( { isLoading: false, currentPage: 1 })
    component.instance().renderResults([requestsMocks.itemApproved, requestsMocks.itemPending], { message: 'error'});
    component.instance().resetPage();
    component.find('[data-test="page-first"]').simulate('click');
    component.find('[data-test="page-prev"]').simulate('click');
    component.find('[data-test="page-next"]').simulate('click');
    component.find('[data-test="page-last"]').simulate('click');
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should Mount data Successfully', () => {
    const component = setUp(mainState); 
    component.instance().renderResults([requestsMocks.itemApproved, requestsMocks.itemPending], { message: 'error'});
    component.instance().resetPage();
    component.instance().allRequestsButton();
    component.setState({ isLoading: false })
    component.setProps({ status: '', data: {
      data: [
        {
          username: 'username',
          email: 'email@gmail.com',
          requests: [requestsMocks.itemPending, requestsMocks.itemApproved],
        },
        {
          username: 'username',
          email: 'email@gmail.com',
          requests: [requestsMocks.itemPending, requestsMocks.itemApproved],
        },
        {
          username: 'username',
          email: 'email@gmail.com',
          requests: [requestsMocks.itemPending, requestsMocks.itemApproved],
        },
        {
          username: 'username',
          email: 'email@gmail.com',
          requests: [requestsMocks.itemPending, requestsMocks.itemApproved],
        },
      ],
    },
  });
    component.find('[data-test="page-first"]').simulate('click');
    component.find('[data-test="page-prev"]').simulate('click');
    component.find('[data-test="page-next"]').simulate('click');
    component.find('[data-test="page-last"]').simulate('click');
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should Mount searchData Successfully', () => {
    const component = setUp(mainState); 
    component.instance().renderResults([requestsMocks.itemApproved, requestsMocks.itemPending], { message: 'error'});
    component.instance().resetPage();
    component.instance().allRequestsButton();
    component.setState({ isLoading: false })
    component.setProps({ status: 'success', managerSearchRequest: { managerSearchData: [requestsMocks.itemApproved, requestsMocks.itemPending] } });
    component.find('[data-test="page-first"]').simulate('click');
    component.find('[data-test="page-prev"]').simulate('click');
    component.find('[data-test="page-next"]').simulate('click');
    component.find('[data-test="page-last"]').simulate('click');
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      managerRequest: {
        dataError: null,
        data: null,
        singleData: null,
      },
      managerSearchRequest: {
        status: '',
        searchData: null,
        searchDataError: null,
      },
      resetPageReducer: {
        resetState: false,
      },
    };
    expect(mapStateToProps(initialState).data).toEqual(null);
  });

});
