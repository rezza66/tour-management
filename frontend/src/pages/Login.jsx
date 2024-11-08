import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import Swal from 'sweetalert2'; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap(); 

      Swal.fire({
        icon: 'success',
        title: 'Login successful',
        text: 'You have successfully logged in!',
      });

      setFormData({
        email: '',
        password: '',
      });

      navigate('/');
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: error.message || 'Invalid credentials. Please try again!',
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="card-title text-center mb-6">Login</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>

          <div className="text-center mt-4">
            <p>Don't have an account? 
              <Link to="/register" className="link link-primary ml-1">Register here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
