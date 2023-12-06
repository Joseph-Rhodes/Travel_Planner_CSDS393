
import Homepage from './pages/Homepage.jsx'
import Media from './pages/Media.jsx'
import Itinerary from './pages/Itinerary.jsx'
import { Login } from './pages/Login.jsx'
import React, { useState } from 'react';
import { Register } from './pages/Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './pages/PrivateRoutes.jsx';
import { UserProvider } from './pages/AccountContext.jsx';


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  
  // login and registration form 
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>} />
          
            <Route path='/Homepage' element={<Homepage/>} />
            <Route path='/Media' element={<Media/>} />
            <Route path='/Itinerary' element={<Itinerary/>} />
          
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
