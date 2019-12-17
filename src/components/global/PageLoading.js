import React from 'react';
import Loader from 'react-loader-spinner';

export default function loadingSpinner() {
  return (
    <Loader
      type="MutatingDots"
      color="#073763"
      height={100}
      width={100}
    />
  );
}
