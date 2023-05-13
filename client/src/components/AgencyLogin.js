import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../Login.css';
// import Navbar from './NavBar';

function AgencyLogin({ onLogin }) {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required('Username is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/loginagency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((resp) => {
          if (resp.status === 200) {
            resp.json().then((user) => {
              onLogin(user);
              navigate('/agencypage');
            });
          }
        })
        .catch((error) => {
          console.error('Error logging in:', error);
        });
    },
  });

  return (
    <div>
      
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default AgencyLogin;
