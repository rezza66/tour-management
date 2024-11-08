import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import Swal from 'sweetalert2'; 
import { BASE_URL } from '../utils/config';

const Register = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        text: 'You have successfully registered!',
      });

      // Hapus nilai form setelah berhasil register
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'user',
        photo: null,
      });

      // Navigasi ke halaman login
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again!',
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-10 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="card-title text-center mb-6">Register</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="input input-bordered"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

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
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select
              name="role"
              className="select select-bordered w-full"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              name="photo"
              className="file-input file-input-bordered w-full"
              onChange={handleChange}
              accept="image/*"
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
