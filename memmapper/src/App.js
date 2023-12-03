
import Homepage from './pages/Homepage.jsx'
import Media from './pages/Media.jsx'
import Itinerary from './pages/Itinerary.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/Media' element={<Media/>}/>
      <Route path='/Itinerary' element={<Itinerary/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
