import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const Breadcrumbs = ({ itemsArray }) => (
  <div>
    <Breadcrumb>
    {itemsArray.map((item, i) => (
      <Breadcrumb.Item key={i}>
      {item}
      </Breadcrumb.Item>
    ))}
    </Breadcrumb>
  </div>
);

export default Breadcrumbs;
