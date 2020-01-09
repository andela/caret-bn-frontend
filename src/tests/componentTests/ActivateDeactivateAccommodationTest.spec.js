import React from 'react';
import { mount } from 'enzyme';
import {ActivateDeactivateAccommodation} from '../../components/pages/ActivateDeactivateAccommodation';

  describe('SearchBar Test Suite', () => {
      const props = {
          location: {
              state:{
                  action: ''
              }
          },
          handleChange: jest.fn(),
          handleSubmit: jest.fn(),
          activateAccommodation: jest.fn(),
      }

  const wrapper = mount(<ActivateDeactivateAccommodation  {...props} />)

    it('render without failling', () => {
        wrapper.find('form').simulate('submit', { preventDefault () {} })
        expect(props.handleSubmit).toHaveBeenCalledTimes(0);
    });

    it('render without failling', () => {
        const event = {target: {name: 'jfljhhjvv', value: 'nmkhjjk'}}
        wrapper.find('input').simulate('change', event)
        expect(props.handleChange).toHaveBeenCalledTimes(0)
    });
});