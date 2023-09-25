import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/contacts';

export default function EditContact({ updateContactHandler }) {
  const navigate = useNavigate();
  const { id } = useParams();

  // Initialize the formData state with empty values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Fetch the contact data when the component mounts
  useEffect(() => {
    const fetchContactData = async () => {
        const response = await api.get(`/contacts/${id}`);
        const { name, email } = response.data;
        // Set the formData state with the contact data
        setFormData({
          name,
          email,
        });
    };
    fetchContactData();
  }, [id]); // Include id as a dependency to re-fetch data when the id changes

  const update = async (e) => {
    e.preventDefault();

    if (formData.name === '' || formData.email === '') {
      alert('All fields are mandatory');
      return;
    }
      // Pass the formData object directly for the update
      await updateContactHandler({ id, ...formData });
      // Redirect to the contact detail or contact list
      navigate('/');
    
  };

  return (
    <div className="ui main" style={{ marginTop: '50px' }}>
      <h2>Edit Contact</h2>
      <form action="" className="ui form" onSubmit={update}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name} // Pre-fill the name field
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email} // Pre-fill the email field
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
}
