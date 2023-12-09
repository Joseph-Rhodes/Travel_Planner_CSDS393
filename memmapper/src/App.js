
import Homepage from './pages/Homepage.jsx'
import Media from './pages/Media.jsx'
import Itinerary from './pages/Itinerary.jsx'
import { Login } from './pages/Login.jsx'
import React from 'react';
import { Register } from './pages/Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoutes.jsx';

 function App() {
  const [user, setUser] = React.useState(null);

  return (
    <>
    
    <BrowserRouter>
   
      
      <Routes>
        <Route index element={<Login setUser={setUser} />} />
        <Route path='/' element={<Login setUser={setUser} /> } />
        <Route path='/register' element={<Register />} />
        <Route element={<PrivateRoute user={user} />} >
          <Route path="Homepage" element={<Homepage setUser={setUser} user={user}/>} />
          <Route path="Itinerary" element={<Itinerary setUser={setUser} user={user}/>} />
          <Route path="Media" element={<Media setUser={setUser} user={user}/>} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      </BrowserRouter>
      
      
    </>
  );
};

 export default App;