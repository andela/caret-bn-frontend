/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    return (
            <div>
                {this.props.render()}
            </div>
    );
  }
}
