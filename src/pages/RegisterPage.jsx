import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDoorSliding } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/logreg/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    if (name === '' || email === '' || password === '') {
      alert('Please fill all the field below');
    } else {
      dispatch(asyncRegisterUser({ name, email, password }));
      navigate('/');
    }
  };

  return (
    <section className="register-page">
      <div>
        <h1 className="header">
          Open the D
          <MdDoorSliding />
          r to discussion
        </h1>
      </div>
      <RegisterInput register={onRegister} />
      <p>
        Have an account?
        {' '}
        <Link to="/" className="logreg-text">Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
