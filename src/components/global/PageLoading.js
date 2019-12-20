import React from 'react';
import Loader from 'react-loader-spinner';
import elf from '../../assets/images/elf.png';

export default function loadingSpinner() {
  return (
    <div className="loading-componenent" data-test="loading-component">
      <Loader
        type="MutatingDots"
        color="#073763"
        height={100}
        width={100}
      />
      <p>Trying to find an elf, be with you in a second!</p>
      <img src={elf} alt="we lost the elf!" />
    </div>
  );
}
