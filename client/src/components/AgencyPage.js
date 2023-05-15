import React, { useEffect, useState } from 'react';
import DogForm from './DogForm';
import '../AgencyPage.css';
import Navbar from './NavBar';

function AgencyPage({ user, onLogout}) {
  const [showForm, setShowForm] = useState(false);
  const [agencyDogs, setAgencyDogs] = useState([])
  const [loading, setLoading] = useState(true)

  

  

  const isLoading = ()=>{
    if (user !==null){
      setLoading(false)
    }
  }
  useEffect(()=>{
    isLoading()
  }, [loading])

    const check = ()=>{
      if (!loading){
        fetch(`/agencydog/${user.id}`)
        .then((resp)=>{
          if (resp.status===200){
            resp.json()
            .then((dog)=>{
              console.log(dog)
              setAgencyDogs(dog)
            })
          }else{
            console.log("no")
          }
    }) 
}}
  check()



  const handleForm = () => {
    setShowForm(!showForm);
  };

  // const handleDogFormSubmit = (values) => {
  //   // Handle dog form submission
  //   console.log('New dog:', values);
  // };

  return (
    <div className="agency-page">
      <Navbar isLoggedIn={user !== null} user={user} onLogout={onLogout}/>
      <h1>Agency</h1>
      <button className="show-form-button" onClick={handleForm}>
        {showForm ? "Close Form" : "Show Form"}
      </button>
      {showForm && <DogForm />}
    </div>
  );
}

export default AgencyPage;