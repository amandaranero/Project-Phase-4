import React, { useState } from 'react';
import DogForm from './DogForm';
import '../AgencyPage.css';
import Navbar from './NavBar';

function AgencyPage({ user, onLogout }) {
  const [showForm, setShowForm] = useState(false);

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const handleDogFormSubmit = (values) => {
    // Handle dog form submission
    console.log('New dog:', values);
  };

  return (
    <div className="agency-page">
      <Navbar isLoggedIn={user !== null} onLogout={onLogout} user={user} />
      <h1>Agency</h1>
      <button className="show-form-button" onClick={handleForm}>
        Show Form
      </button>
      {showForm && <DogForm onSubmit={handleDogFormSubmit} />}
    </div>
  );
}

export default AgencyPage;
