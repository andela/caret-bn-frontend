import EditAccommodations from './../../views/accommodations/editAccommodation';
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import mockStore from '../../utilities/tests/mockStore';
import findByTestAttribute from './../../utilities/tests/findByTestAttribute';
import accommodationMocks from '../mocks/accommodationsMocks';

const updatedMock = {
  name: 'Isimbi Hotel',
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  highlights: 'Lorem Ipsum',
  amenities: 'Lorem Ipasum',
  images: 'http://res.cloudinary.com/ddypcld8o/image/upload/v1576174843/beyud6wxuuk9id4dggoh.jpg',
};

const initialState = {
  accommodation: {
    accommodation: null,
    accommodationError: null,
    status: '',
    getAccommodation: [],
    getAccommodationError: {},
    searchError: null,
    searchResults: null,
    singleAccommodation: {},
    singleAccommodationError: {},
  },
};

const locations = {
  data: {
    data: [{
      id: 1,
      name: 'Blantyre',
    }, {
      id: 2,
      name: 'Lilongwe',
    }, {
      id: 3,
      name: 'Zomba',
    }],
  }
};

const matchProps = {
  match: {
    params: 'isimbi-hotel'
  },

};

const updateError = {
  data: {
    message: 'It broke'
  }
}

const setUp = (initialState = {}, props) => {
  const store = mockStore(initialState);
  const wrapper = shallow(<EditAccommodations store={store} {...props} />).childAt(0).dive();
  return wrapper;
};

describe('Test Request Component', () => {

  it('Should show loading page', async () => {
    const component = setUp(initialState, {})
    expect(findByTestAttribute(component, 'loading-page').length).toBe(1);
  });

  it('Should render correctly', async () => {
    const component = setUp(initialState, {})
    component.setProps({ locations: locations, accommodation: accommodationMocks })
    component.setState({ accommodation: accommodationMocks, isLoading: false })
    expect(findByTestAttribute(component, 'form').length).toBe(1);
  });

  it('Should render correctly', async () => {
    const component = setUp(initialState, {})
    component.setProps({ locations: locations, accommodation: accommodationMocks, status: 'success' })
    component.setState({ accommodation: accommodationMocks, isLoading: false })
    expect(findByTestAttribute(component, 'redirect').length).toBe(1);
  });

  it('Should call handleChange without errors', async () => {
    const component = setUp(initialState, {});
    component.setProps({
      locations: locations, accommodation: accommodationMocks, GetSingleAccommodation: jest.fn(),
      getLocations: jest.fn(),
    })
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
    component.setState({ accommodation: accommodationMocks, isLoading: false })
    component.instance().handleChange({ target: { value: 'this hotel', name: 'name' } });
    expect(handleChangeSpy).toBeCalled();
  });

  it('Should call handleChange without errors', async () => {
    const component = setUp(initialState, {});
    component.setProps({
      locations: locations, accommodation: accommodationMocks, GetSingleAccommodation: jest.fn(),
      getLocations: jest.fn(),
    })
    const updateAccommodationSpy = jest.spyOn(component.instance(), 'updateAccommodation');
    component.setState({ accommodation: accommodationMocks, isLoading: false })
    component.instance().updateAccommodation({ target: { ame: 'name', }, preventDefault: jest.fn() });
    expect(updateAccommodationSpy).toBeCalled();
  });

  it('Call handlefile change with no errors', async () => {
    const component = setUp(initialState, {});
    const handleFileSpy = jest.spyOn(component.instance(), 'handleFileChange');
    component.instance().handleFileChange();
    expect(handleFileSpy).toBeCalled();
  });

  it('Call update Accommodations with no errors', async () => {
    const component = setUp(initialState, {});
    const updateAccommodationSpy = jest.spyOn(component.instance(), 'updateAccommodation');
    component.setProps({
      locations: locations, accommodation: accommodationMocks, GetSingleAccommodation: jest.fn(),
      getLocations: jest.fn(),
    })
    component.setState({ accommodation: accommodationMocks, isLoading: false, updatedAccommodation: updatedMock })
    component.instance().updateAccommodation({ preventDefault: jest.fn() });
    expect(updateAccommodationSpy).toBeCalled();
  });
});