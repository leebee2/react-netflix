import { Route, Routes } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';

import { Home, MovieDetail, Intro, MovieCrew, MoviesPage } from './pages';
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
      {location.pathname !== "/" && <Navigation />}
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nowmovies" element={<MoviesPage type="now"/>} />
        <Route path="/movies" element={<MoviesPage type="all" />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/crews/:id" element={<MovieCrew />} />
     </Routes>
    </div>
  );
}

export default App;
