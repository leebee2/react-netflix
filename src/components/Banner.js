import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { Button } from 'react-bootstrap';


const Banner = ({ movie }) => {
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
    const dispatch = useDispatch();
    const { movieDetail } = useSelector(state => state.movie);
    const [ isClick, setIsClick] = useState(false);


    useEffect(() => {
        dispatch(movieAction.getMovieDetail(movie.id));
    }, [])


    return (
        <div className="banner" style={{
            backgroundImage: `URL(${imgBaseUrl}${movie.backdrop_path})`
        }}>
            {isClick ?
                <div className='banner-area'>
                    <iframe
                        className='banner-video'
                        src={`https://www.youtube.com/embed/${movieDetail.key}?controls=&autoplay=1&loop=1&mute=1&playlist=${movieDetail.key}`}
                        title="YouTube video player"
                        allow="autoplay; fullscreen">
                    </iframe>
                </div>
                :
                <div className='banner-info'>
                    <h1>{movie.title}</h1>
                    <div>
                        <Button variant="light" size="sm" onClick={() => setIsClick(true)}>▶ 재생</Button>
                        <Button variant="light" size="sm" className="banner-btn" onClick={() => setIsClick(true)}>상세정보</Button>
                    </div>
                    <div>{movie.overview}</div>
                </div>}
        </div>
    );
};

export default Banner;