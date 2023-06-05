import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDoorSliding } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/logreg/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    if (email === '' || password === '') {
      alert('Please fill all the field below');
    } else {
      dispatch(asyncSetAuthUser({ email, password }));
      navigate('/');
    }
  };

  return (
    <section className="login-page">
      <div>
        <h1 className="header">
          Open the D
          <MdDoorSliding />
          r to discussions
        </h1>
      </div>
      <LoginInput login={onLogin} />
      <p>
        Don&apos;t have an account?
        {' '}
        <Link to="/register" className="logreg-text">Register</Link>
      </p>
    </section>
  );
}

export default LoginPage;
