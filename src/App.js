import { Route, Routes } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home, Movies, MovieDetail, Intro } from './pages';
import { Navigation } from './components';
import { useLocation } from "react-router-dom";


function App() {
  const location = useLocation();

  
  return (
    <div>
      {location.pathname != "/intro" && <Navigation />}
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
     </Routes>
    </div>
  );
}

export default App;
