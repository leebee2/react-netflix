import { Route, Routes } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';

import { Home, Movies, MovieDetail, Intro, MovieCrew } from './pages';
import { Navigation } from './components';
import { useLocation } from "react-router-dom";


// fontawesome global
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faMagnifyingGlass, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckToSlot, faMagnifyingGlass, faCircleInfo)


function App() {
  const location = useLocation();

  
  return (
    <div>
      {location.pathname != "/" && <Navigation />}
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/crew" element={<MovieCrew />} />
     </Routes>
    </div>
  );
}

export default App;
