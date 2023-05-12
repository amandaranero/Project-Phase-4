import React, { useState } from 'react';
import DogForm from './DogForm';

function AgencyPage() {

  const [showForm, setShowForm] = useState(false);

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const handleDogFormSubmit = (values) => {
    // Handle dog form submission
    console.log('New dog:', values);
  };

  return (
    <div>
      <h1>Agency</h1>
      <button onClick={handleForm}>Show Form</button>
      {showForm && <DogForm onSubmit={handleDogFormSubmit} />}
    </div>
  );
}

export default AgencyPage;