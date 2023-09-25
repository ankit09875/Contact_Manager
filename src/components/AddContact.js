import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function AddContact({ addContactHandler }) {
  const [formData, setFormData] = useState({ name: '', email: '' }); // Initialize both name and email

  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();

    if (formData.name === '' || formData.email === '') {
      alert('All fields are mandatory');
      return;
    }

    addContactHandler({ id: uuidv4(), ...formData }); // Spread formData
    setFormData({ name: '', email: '' }); // Clear the form fields

    navigate('/');
  };

  return (
    <div className='ui main'>
      <h2>Add Contact</h2>
      <form action='' className='ui form' onSubmit={add}>
        <div className='field'>
          <label htmlFor=''>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Update name field
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Update email field
          />
        </div>
        <button className='ui button blue'>Add</button>
      </form>
    </div>
  );
}
