import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import CreateAccommodation from '../../components/pages/CreateAccommodation';
import findByTestAttribute from '../../utilities/tests/findByTestAttribute';
import mockStore from '../../reduxStore';

const blankState = {
  name: '',
  description: '',
  locationId: '',
  availableSpace: '',
  cost: '',
  currency: '',
  highlights: '',
  amenities: '',
  selectedFile: null,
  isLoading: false,
  error: {
    message: '',
  },
}
const setUp = (initialState = {}, props) => {
  const store = mockStore;
  const wrapper = shallow(
    <MemoryRouter>
      <CreateAccommodation.WrappedComponent store={store} {...props} />
    </MemoryRouter>
  ).childAt(0).dive();
  return wrapper;
};


describe('Create accommodation Test Suite success status', () => {
  it('Get Derived State From Props', () => {
    const component = setUp(blankState, {
      fetchLocations: jest.fn(),
      getLocations: jest.fn()
    });

    component.setState({
      isLoading: true
    });
    const nextProps = {
      accommodationData: {
        data: {
          slug: 'my-comp'
        }
      },
      status: 'Success',
      history: {
        push: jest.fn()
      }
    };
    component.setProps(nextProps);
    expect(component.state().isLoading).toEqual(false)
  });

  it('Should Mount Successfully failed status', () => {
    const component = setUp(blankState, {
      fetchLocations: jest.fn(),
      getLocations: jest.fn()
    });
    component.setState({
      isLoading: true
    });
    const nextProps = {
      accommodationData: {
        data: {
          slug: 'my-comp'
        }
      },
      status: 'Failure',
      history: {
        push: jest.fn()
      }
    };
    component.setProps(nextProps);
    expect(component.state().isLoading).toEqual(false);
  });


  it('Should Mount Successfully non status', () => {
    const component = setUp(blankState, {
      fetchLocations: jest.fn(),
      getLocations: jest.fn()
    });
    component.setState({
      isLoading: true
    });
    const nextProps = {
      accommodationData: {
        data: {
          slug: 'my-comp'
        }
      },
      status: '',
      history: {
        push: jest.fn()
      },
      accommodationError: {
        data: {
          message: 'my error'
        }
      }
    };
    component.setProps(nextProps);
    expect(component.state().isLoading).toEqual(true)
  });

  it('Should handleChane', () => {
    const component = setUp(blankState, {
      fetchLocations: jest.fn(),
      getLocations: jest.fn()
    });

    component.setProps({
      locations: {
        data: [
          {
            id: 1,
            name: 'loc-1'
          }
        ]
      }
    });

    const nameField = findByTestAttribute(component, 'name');
    nameField.simulate('change', { target: { name: 'name', value: 'hello' } });
    expect(component.state().name).toEqual('hello');
  });

  it('Should handle FileChange', () => {
    const component = setUp(blankState, {
      fetchLocations: jest.fn(),
      getLocations: jest.fn()
    });

    component.setProps({
      locations: {
        data: [
          {
            id: 1,
            name: 'loc-1'
          }
        ]
      }
    });

    const image = findByTestAttribute(component, 'image');
    image.simulate('change', { target: { files: 'link-to-my-file' } });
    expect(component.state().selectedFile).toEqual('link-to-my-file');
  });

  it('Should handle submit no Highlights', () => {
    const component = setUp(blankState, {
      fetchLocations: jest.fn(),
      getLocations: jest.fn(),
      showAlert: jest.fn(),
      addAccommodation: jest.fn()
    });


    const form = findByTestAttribute(component, 'form');
    const cost = findByTestAttribute(component, 'cost');
    const availableSpace = findByTestAttribute(component, 'availableSpace');
    const currency = findByTestAttribute(component, 'currency');
    const location = findByTestAttribute(component, 'location');
    const description = findByTestAttribute(component, 'description');
    const amenities = findByTestAttribute(component, 'amenities');
    const highlights = findByTestAttribute(component, 'highlights');
    const image = findByTestAttribute(component, 'image');

    cost.simulate('change', { target: { name: 'cost', value: '300' } })
    availableSpace.simulate('change', { target: { name: 'availableSpace', value: '3' } })
    currency.simulate('change', { target: { name: 'currency', value: 'MK' } })
    location.simulate('change', { target: { name: 'location', value: '1' } })
    image.simulate('change', { target: { files: 'link-to-my-file' } });

    const changeAmenities = jest.fn();
    changeAmenities.mockReturnValue('these are amenities');
    amenities.prop('onChange')({}, { getData: changeAmenities });

    const changeDescriptions = jest.fn();
    changeDescriptions.mockReturnValue('these are my descriptions');
    description.prop('onChange')({}, { getData: changeDescriptions });

    form.simulate('submit', {
      preventDefault: jest.fn()
    });
  });

  it('Should handle submit Ameneties', () => {
    const component = setUp(blankState, {
      fetchLocations: jest.fn(),
      getLocations: jest.fn(),
      showAlert: jest.fn(),
      addAccommodation: jest.fn()
    });


    const form = findByTestAttribute(component, 'form');
    const cost = findByTestAttribute(component, 'cost');
    const availableSpace = findByTestAttribute(component, 'availableSpace');
    const currency = findByTestAttribute(component, 'currency');
    const location = findByTestAttribute(component, 'location');
    const description = findByTestAttribute(component, 'description');
    const amenities = findByTestAttribute(component, 'amenities');
    const highlights = findByTestAttribute(component, 'highlights');
    const image = findByTestAttribute(component, 'image');

    cost.simulate('change', { target: { name: 'cost', value: '300' } })
    availableSpace.simulate('change', { target: { name: 'availableSpace', value: '3' } })
    currency.simulate('change', { target: { name: 'currency', value: 'MK' } })
    location.simulate('change', { target: { name: 'location', value: '1' } })
    image.simulate('change', { target: { files: 'link-to-my-file' } });


    const changeHighlights = jest.fn();
    changeHighlights.mockReturnValue('these are highlights');
    highlights.prop('onChange')({}, { getData: changeHighlights });

    const changeDescriptions = jest.fn();
    changeDescriptions.mockReturnValue('these are my descriptions');
    description.prop('onChange')({}, { getData: changeDescriptions });

    form.simulate('submit', {
      preventDefault: jest.fn()
    });
  });

  it('Should handle submit no Description', () => {
    const component = setUp(blankState, {
      fetchLocations: jest.fn(),
      getLocations: jest.fn(),
      showAlert: jest.fn(),
      addAccommodation: jest.fn()
    });


    const form = findByTestAttribute(component, 'form');
    const cost = findByTestAttribute(component, 'cost');
    const availableSpace = findByTestAttribute(component, 'availableSpace');
    const currency = findByTestAttribute(component, 'currency');
    const location = findByTestAttribute(component, 'location');
    const description = findByTestAttribute(component, 'description');
    const amenities = findByTestAttribute(component, 'amenities');
    const highlights = findByTestAttribute(component, 'highlights');
    const image = findByTestAttribute(component, 'image');

    cost.simulate('change', { target: { name: 'cost', value: '300' } })
    availableSpace.simulate('change', { target: { name: 'availableSpace', value: '3' } })
    currency.simulate('change', { target: { name: 'currency', value: 'MK' } })
    location.simulate('change', { target: { name: 'location', value: '1' } })
    image.simulate('change', { target: { files: 'link-to-my-file' } });


    const changeHighlights = jest.fn();
    changeHighlights.mockReturnValue('these are highlights');
    highlights.prop('onChange')({}, { getData: changeHighlights });


    const changeAmenities = jest.fn();
    changeAmenities.mockReturnValue('these are amenities');
    amenities.prop('onChange')({}, { getData: changeAmenities });

    form.simulate('submit', {
      preventDefault: jest.fn()
    });
  });

  it('Should handle submit ', () => {
    const component = setUp(blankState, {
      fetchLocations: jest.fn(),
      getLocations: jest.fn(),
      showAlert: jest.fn(),
      addAccommodation: jest.fn()
    });


    const form = findByTestAttribute(component, 'form');
    const cost = findByTestAttribute(component, 'cost');
    const availableSpace = findByTestAttribute(component, 'availableSpace');
    const currency = findByTestAttribute(component, 'currency');
    const location = findByTestAttribute(component, 'location');
    const description = findByTestAttribute(component, 'description');
    const amenities = findByTestAttribute(component, 'amenities');
    const highlights = findByTestAttribute(component, 'highlights');
    const image = findByTestAttribute(component, 'image');

    cost.simulate('change', { target: { name: 'cost', value: '300' } })
    availableSpace.simulate('change', { target: { name: 'availableSpace', value: '3' } })
    currency.simulate('change', { target: { name: 'currency', value: 'MK' } })
    location.simulate('change', { target: { name: 'location', value: '1' } })
    image.simulate('change', { target: { files: 'link-to-my-file' } });


    const changeHighlights = jest.fn();
    changeHighlights.mockReturnValue('these are highlights');
    highlights.prop('onChange')({}, { getData: changeHighlights });


    const changeAmenities = jest.fn();
    changeAmenities.mockReturnValue('these are amenities');
    amenities.prop('onChange')({}, { getData: changeAmenities });

    const changeDescriptions = jest.fn();
    changeDescriptions.mockReturnValue('these are my descriptions');
    description.prop('onChange')({}, { getData: changeDescriptions });

    form.simulate('submit', {
      preventDefault: jest.fn()
    });
  });


});    