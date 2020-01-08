import React from 'react';
import { shallow } from 'enzyme';
import { StatsForm, mapStateToProps } from '../../components/pages/requests/StatsForm';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import requestsMocks from '../mocks/requestsMocks';

const middlewares = [thunk];

const mainState = {
}

const props = {
  props: requestsMocks.viewRequestsProps,
  searchRequests: {
    status: '',
    searchData: null,
    searchDataError: null,
  },
  statsData: {
    data: {
      NumberOfTrips: 0,
      Trips: [
        requestsMocks.itemApproved,
        requestsMocks.itemPending,
      ],
    },
  },
  getStatsAction: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <StatsForm {...props} store={store} />
  );
    return wrapper;
} 

describe('StatsForm Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    const date = component.find('DayPickerInput')
    date.at(0).prop('onDayChange')(Date.now())
    date.at(1).prop('onDayChange')(Date.now())
    component.find('[data-test="get-stats"]').simulate('click');
    expect(component.find('[data-test="get-stats"]')).toHaveLength(1);
  });

  it('Should Mount Successfully with 0 Trips', () => {
    const component = setUp(mainState);
    const date = component.find('DayPickerInput')
    date.at(0).prop('onDayChange')(Date.now())
    // date.at(1).prop('onDayChange')(Date.now())
    component.find('[data-test="get-stats"]').simulate('click');
    component.setProps({ statsData: {
      data: {
        NumberOfTrips: 0,
        Trips: [
          requestsMocks.itemApproved,
          requestsMocks.itemPending,
        ],
      },
    },});

    expect(component.find('[data-test="get-stats"]')).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      requests: {
        dataError: null,
        data: null,
        singleData: null,
        statsData: null,
        statsErrorf: null,
      }
    };
    expect(mapStateToProps(initialState)).toEqual({});
  });

});
