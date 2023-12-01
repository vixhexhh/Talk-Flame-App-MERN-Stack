import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../../feature/auth.slice';
import Loader from '../loader/Loader';
import './style.css';

const Login = () => {
  const dispatch = useDispatch();
  const [emailField, setEmailField] = useState('');
  const [passwordField, setpasswordField] = useState('');

  const { isError, user, isSuccess, isLoading, message } = useSelector(store => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess || user !== null) {
      navigate('/chat');
    }
  }, [user, isError, navigate, isSuccess, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(logIn({ username: emailField, password: passwordField }));
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='container'>
      <div className='left-side'>
        <div className='text-container'>
          <h2 className='header'>TalkFlame</h2>
          <p className='edits'>
            Welcome to TalkFlame, you want to communicate with other people around the world, Signup to have an access to our platform
          </p>
        </div>
      </div>
      <div className='right-side right-login'>
        <div className='head-section'>
          {/* <img src="./assets/images/chatapp-logo-small.jpg" alt='logo' width={130} /> */}
          {/* <p className='text'>  TalkFlame <br>Please enter your credentials!</br></p> */}
          <h3 className='cust'>Login into account</h3>
        </div>
        <form autoComplete='off' onSubmit={e => handleSubmit(e)}>
          <div className='form-group'>
            <label htmlFor="email">Email or Username</label>
            <input type="text" value={emailField} onChange={e => setEmailField(e.target.value)} placeholder='Enter your email or username' className='input-field' id='email' name='email' />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" value={passwordField} onChange={e => setpasswordField(e.target.value)} placeholder='Enter your password' className='input-field' id='password' name='password' autoComplete='off' />
          </div>
          <div className='form-group'>
            <input type="submit" value="Login" className='btn-signup' id='btn-signup' name='btn-signup' required />
          </div>
        </form>
        <div>
          <p>You don't have an account ? <Link to="/signup">Signup</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;