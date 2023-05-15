

import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import NavBar from './components/NavBar'
import SignupAdopter from './components/SignupAdopter'
import SignupAgency from './components/SignupAgency'
import AdopterPage from './components/AdopterPage'
import AgencyPage from './components/AgencyPage'
import AdopterLogin from './components/AdopterLogin'
import {useEffect, useState} from 'react';
import AgencyLogin from './components/AgencyLogin';
import AllAgencies from './components/AllAgencies'


function App() {
  const [user, setUser] = useState(null)
  const [dogs, setDogs] = useState([])
  const [agencies, setAgencies] = useState([])
  const navigate = useNavigate()

  


//fetch agenices    
  useEffect(()=>{
      fetch('/agencies')
      .then((resp)=>{
      if (resp.status ===200){
          resp.json()
          .then((agency)=>{
          setAgencies(agency)
          })
      }
      })
  }, [])



//check session
  useEffect(()=>{
    fetch('/check_session')
    .then((resp)=>{
      if (resp.status === 200){
        resp.json()
        console.log(user)
        .then((user)=> setUser(user))
      }
    })
  }, []);


  //fetch dogs
  useEffect(()=>{
    fetch('/dogs')
    .then((resp)=>{
      if (resp.status === 200){
        resp.json()
        .then((dog)=> {
          setDogs(dog)
        })
      }
    })
  }, []);


  function handleLogout(){
    fetch('/logout',{
      method: 'DELETE'
    })
    .then(()=>setLogout())
    .then(()=>{
      navigate('/')
    })
  }

  

  function handleLogin(user){
    setUser(user)
  }

  function setLogout(){
    setUser(null)
  }

  return (
    <div className="App">
      <header className="App-header">
          <Routes>
            <Route index element={<NavBar onLogout = {handleLogout} />}/>
              <Route path = '/agencypage' element={<AgencyPage user={user}  onLogout = {handleLogout}/>} />
              <Route path = '/adopterpage' element={<AdopterPage dogs={dogs} agencies={agencies} user={user} onLogout = {handleLogout}/>}/>
              <Route path = '/newadopter' element={<SignupAdopter/>} />
              <Route path = '/newagency' element={<SignupAgency/>} />
              <Route path = '/adopterlogin' element={<AdopterLogin onLogin={handleLogin}/>} />
              <Route path = '/agencylogin' element={<AgencyLogin onLogin={handleLogin}/>} />
              <Route path = '/allagencies' element={<AllAgencies agencies={agencies} />}/>
          </Routes>
      </header>
    </div>
  );
}

export default App;
//pass in handleLogin ifneed to