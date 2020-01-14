import React from 'react';
import { Spinner } from 'react-bootstrap';
import elf from '../../assets/images/elf.png';

export default function loadingSpinner() {
  return (
    <div className="loading-componenent" data-test="loading-component">
      <Spinner animation="grow" size="lg" variant="primary" />
      <p>Trying to find an elf, be with you in a second!</p>
      <img src={elf} alt="we lost the elf!" />
    </div>
  );
}
