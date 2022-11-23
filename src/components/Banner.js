import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Banner = ({ movie }) => {
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { movieVideo } = useSelector(state => state.movie);
    const { mainVideoClick } = useSelector(state => state.main);

    const getMovieVideo = useCallback(() => {
        dispatch(movieAction.getMovieVideo(movie.id));
    }, [dispatch, movie.id]);

    const setIsClick = (flag) => {
        dispatch({ type: 'MAIN_VIDEO_FLAG', payload: { mainVideoClick: flag } });
    }

    useEffect(() => {
        getMovieVideo();
    }, [getMovieVideo])

    return (
        <div>
            {mainVideoClick ?
                <div className='banner-video'>
                    <Button size="ms" variant="Secondary" onClick={() => setIsClick(false)}>
                        X
                    </Button>
                    <iframe src={`https://www.youtube.com/embed/${movieVideo.key}?
                    controls=0&autoplay=1&loop=1&mute=1&playlist=${movieVideo.key}`}
                        title="YouTube video player"
                        allow="autoplay; fullscreen" />
                </div >
                :
            <div className="banner" style={{ backgroundImage: `URL(${imgBaseUrl}${movie.backdrop_path})` }}>
                    <div className='banner-info'>
                        <h1>{movie.title}</h1>
                        <div>
                            {movieVideo !== undefined && <Button variant="light" size="sm" onClick={() => setIsClick(true)}>▶ 재생</Button>}
                            <Button variant="light" size="sm" className="banner-btn" onClick={() => nav(`/movies/${movie.id}`)}>
                                <FontAwesomeIcon icon="fa-circle-info" /> 상세정보
                            </Button>
                        </div>
                        <div>{movie.overview}</div>
                    </div>
                </div>}
        </div>
    );
};

export default Banner;