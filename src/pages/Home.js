import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Banner, MovieSlide } from '../components';
import Loadingbar from '../Modal/Loadingbar';
import { movieAction } from '../redux/actions/movieAction';

const dataName = [
    { title: '최신 인기 영화', dname: 'popularMovies' },
    { title: 'TMDB 인기 영화', dname: 'topRatedMovies' },
    { title: '개봉 예정 영화', dname: 'upcomingMovies' }
]

const Home = () => {
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movie);

    console.log(movie);
    useEffect(() => {
        dispatch(movieAction.getMovies());
    }, [])


    if (movie.loading) {
        return <Loadingbar loading={movie.loading} />
    }
    return (
        <div>
            {movie.popularMovies.results && <Banner movie={movie.popularMovies.results[0]} />}
            <div className='movie_container'>
                {dataName.map((item,index) => (<span key={index}>
                    <h3>{item.title}</h3>
                    <MovieSlide movies={movie[item.dname]} />
                </span>))}
            </div>
        </div>
    );
};

export default Home;