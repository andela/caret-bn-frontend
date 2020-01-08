import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar, mapStateToProps } from '../../components/pages/requests/SearchBar';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import requestsMocks from '../mocks/requestsMocks';
import DayPickerInput from 'react-day-picker/DayPickerInput';


const middlewares = [thunk];

const mainState = {
  locations: {
    dataError: null,
    data: [
      {
        id: 1,
        name: 'Kigali Office',
        country: 'Rwanda',
      },
      {
        id: 2,
        name: 'Lagos Office',
        country: 'Nigeria',
      },
    ],
  },
}

const props = {
  props: requestsMocks.getLocationsProps,
  getLocations: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <SearchBar {...props} store={store} />
  );
  return wrapper;
}

describe('SearchBar Test Suite', () => {
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    component.instance().hideStats();
    expect(component.exists()).toBe(true);
  });

  it('Should handleDayChange', () => {
    const component = setUp(mainState);
    component.find('.btn-block').first().simulate('click')
    component.find('.day-picker').first().simulate('dayChange')
    expect(component).toMatchSnapshot();

  });

  it('Should search for pending requests', () => {
    const component = setUp(mainState);
    const handleSubmitSpy = jest.spyOn(component.instance(), 'searchRequest');
    component.find('[data-test="filter-request"]').simulate('click');

    const statusId = { target: { name: 'statusId', value: '1' } };
    component.find('[data-test="status-id"]').simulate('change', statusId);
    component.find('[data-test="search-request"]').simulate('click');
    expect(handleSubmitSpy).toReturn();
  });

  it('Should return initial data', () => {
    const initialState = {
      locations: {
        dataError: null,
        data: null,
      },
    };
    expect(mapStateToProps(initialState).locations).toEqual(null);
  });
});
