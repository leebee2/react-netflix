import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Banner, MovieSlide } from '../components';
import Loadingbar from '../Modal/Loadingbar';
import { movieAction } from '../redux/actions/movieAction';


const Home = () => {
    const dispatch = useDispatch();
    const { popularMovies, topRatedMovies, upcomingMovies, loading } = useSelector(state => state.movie);

    useEffect(() => {
        dispatch(movieAction.getMovies());
    }, [])


    if (loading) {
        return <Loadingbar loading={loading} />
    }
    return (
        <div>
            {popularMovies.results && <Banner movie={popularMovies.results[0]} />}
            <div className='movie_container'>
                <h3>인기있는 영화</h3>
                <MovieSlide movies={popularMovies} />
                <h3>TMDB 인기영화</h3>
                <MovieSlide movies={topRatedMovies} />
                <h3>개봉 예정 영화</h3>
                <MovieSlide movies={upcomingMovies} />
            </div>
        </div>
    );
};

export default Home;