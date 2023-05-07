import './App.css';
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import SignupAdopter from './components/SignupAdopter'
import SignupAgency from './components/SignupAgency'
import AdopterPage from './components/AdopterPage'
import AgencyPage from './components/AgencyPage'
import AdopterLogin from './components/AdopterLogin'
import {useEffect, useState} from 'react';
import AgencyLogin from './components/AgencyLogin';


function App() {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    fetch('/check_session')
    .then((resp)=>{
      if (resp.status === 200){
        resp.json()
        .then((user)=> setUser(user))
      }
    })
  }, []);



  function handleLogin(user){
    setUser(user)
  }

  function handleLogout(user){
    setUser(null)
  }

  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        <Route index element={<NavBar onLogout = {handleLogout}/>}/>
        <Route path = '/agencypage' element={<AgencyPage/>} />
        <Route path = '/adopterpage' element={<AdopterPage/>}/>
        <Route path = '/newadopter' element={<SignupAdopter/>} />
        <Route path = '/newagency' element={<SignupAgency/>} />
        <Route path = '/adopterlogin' element={<AdopterLogin onLogin={handleLogin}/>} />
        <Route path = '/agencylogin' element={<AgencyLogin onLogin={handleLogin}/>} />
      </Routes>
      </header>
    </div>
  );
}

export default App;
