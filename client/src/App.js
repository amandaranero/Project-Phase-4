import './App.css';
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import SignupAdopter from './components/SignupAdopter'
import SignupAgency from './components/SignupAgency'
import AdopterPage from './components/AdopterPage'
import AgencyPage from './components/AgencyPage'


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        <Route index element={<NavBar/>}/>
        <Route path = '/agencypage' element={<AgencyPage/>} />
        <Route path = '/adopterpage' element={<AdopterPage/>}/>
        <Route path = '/newadopter' element={<SignupAdopter/>} />
        <Route path = '/newagency' element={<SignupAgency/>} />
      </Routes>
      </header>
    </div>
  );
}

export default App;
