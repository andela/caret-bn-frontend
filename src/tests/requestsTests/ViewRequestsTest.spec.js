import React from 'react';
import { shallow } from 'enzyme';
import { ViewRequests, mapStateToProps } from '../../views/requests/ViewRequests';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import requestsMocks from '../mocks/requestsMocks';

const middlewares = [thunk];

const mainState = {
  requests: {
    dataError: null,
    data: null,
    singleData: null,
  },
  searchRequests: {
    status: '',
    searchData: null,
    searchDataError: null,
  }
}

const props = {
  props: requestsMocks.viewRequestsProps,
  searchRequests: {
    status: '',
    searchData: null,
    searchDataError: null,
  },
  status: 'all-success',
  data: [requestsMocks.itemApproved, requestsMocks.itemPending],
  getRequestsAction: jest.fn(),
  cancelResetPageAction: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <ViewRequests {...props} store={store} />
  );
    return wrapper;
} 

describe('ViewRequests Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    component.instance().renderResults([requestsMocks.itemApproved, requestsMocks.itemPending], { message: 'error'});
    component.instance().resetPage();
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
    component.setProps({ status: 'search-success', searchData: [requestsMocks.itemApproved, requestsMocks.itemPending] });
    component.find('[data-test="page-first"]').simulate('click');
    component.find('[data-test="page-prev"]').simulate('click');
    component.find('[data-test="page-next"]').simulate('click');
    component.find('[data-test="page-last"]').simulate('click');
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should Mount statsData Successfully', () => {
    const component = setUp(mainState); 
    component.instance().renderResults([requestsMocks.itemApproved, requestsMocks.itemPending], { message: 'error'});
    component.instance().resetPage();
    component.setProps({ status: 'stats-success', statsData: { data: { Trips: [requestsMocks.itemApproved, requestsMocks.itemPending]} } });
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should Mount dataError Successfully', () => {
    const component = setUp(mainState); 
    component.instance().renderResults([requestsMocks.itemApproved, requestsMocks.itemPending], { message: 'error'});
    component.instance().resetPage();
    component.setProps({ status: 'all-error', dataError: {message: 'error'} });
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should Mount dataError Successfully', () => {
    const component = setUp(mainState); 
    component.instance().renderResults([requestsMocks.itemApproved, requestsMocks.itemPending], { message: 'error'});
    component.instance().resetPage();
    component.setProps({ status: 'search-error', searchDataError: {message: 'error'} });
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should Mount dataError Successfully', () => {
    const component = setUp(mainState); 
    component.instance().renderResults([requestsMocks.itemApproved, requestsMocks.itemPending], { message: 'error'});
    component.instance().resetPage();
    component.setProps({ status: 'stats-error', statsError: {message: 'error'} });
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      requests: {
        dataError: null,
        data: null,
        singleData: null,
      },
      searchRequests: {
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
