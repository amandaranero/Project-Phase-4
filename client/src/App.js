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
  const [dogs, setDogs] = useState([])
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
        <Route path = '/adopterpage' element={<AdopterPage user={user} dogs={dogs}/>}/>
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