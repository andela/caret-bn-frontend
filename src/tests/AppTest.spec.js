import React from 'react';
import { shallow } from 'enzyme';
// import { App } from '../components/App';
import Home  from '../components/Home';
import { mapStateToProps } from '../components/Home';

const text =  { text: 'Hola Amigos!' };
const mock = jest.fn();
 
const wrapper = shallow(
      <Home default={text} fireReduxAction={mock} />
);

describe('Default Test Suite', () => {
  it('Should return true equal true', () => {
    expect(true).toEqual(true);
  });

  it('Should render <App />', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render <h1>', () => {
    expect(wrapper.find('h1').text()).toBe('Welcome to barefoot Nomad');
  });
});
