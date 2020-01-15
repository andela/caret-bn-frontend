import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterSuccess = () => {
  document.title = 'Barefoot Nomad - Register';
  return (
        <div>
          <h4 className="register-success">
            Your account has been successfully created!
          </h4>
          <br />
          <h4>
            Verify your email and
            {' '}
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </h4>
        </div>
  );
};

export default RegisterSuccess;
