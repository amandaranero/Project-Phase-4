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
import AllAgencies from './components/AllAgencies'

function App() {
  const [user, setUser] = useState(null)
  const [dogs, setDogs] = useState([])
  const [agencies, setAgencies] = useState([])
  useEffect(()=>{
    fetch('/check_session')
    .then((resp)=>{
      if (resp.status === 200){
        resp.json()
        .then((user)=> {
          console.log(user) 
              setUser(user)
        })
      }
    })
  }, []);
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
  function handleLogin(user){
    setUser(user)
  }
  function handleLogout(){
    setUser(null)
  }
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        <Route index element={<NavBar onLogout = {handleLogout} user={user}/>}/>
        <Route path = '/agencypage' element={<AgencyPage user={user}/>} />
        <Route path = '/adopterpage' element={<AdopterPage user={user} dogs={dogs} agencies={agencies}/>}/>
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