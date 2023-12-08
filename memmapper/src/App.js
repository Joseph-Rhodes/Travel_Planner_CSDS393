
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
          <Route path="Homepage" element={<Homepage setUser={setUser}/>} />
          <Route path="Itinerary" element={<Itinerary setUser={setUser}/>} />
          <Route path="Media" element={<Media setUser={setUser}/>} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      </BrowserRouter>
      
      
    </>
  );
};

// const Navigation = () => (
//   <nav>
//     <Link to="/">Login</Link>
//     <Link to="/Homepage">Homepage</Link>
//     <Link to="/Itinerary">Itinerary</Link>
//     <Link to="/Media">Media</Link>
//   </nav>
// );

// const Homepage = () => {
//   return <h2>Home (Protected: authenticated user required)</h2>;
// };

// const Media = () => {
//   return <h2>Home (Protected: authenticated user required)</h2>;
// };

// const Itinerary = () => {
//   return <h2>Home (Protected: authenticated user required)</h2>;
// };



 export default App;