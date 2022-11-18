import React from 'react';

const Banner = ({ movie }) => {
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces'
    console.log(movie);

    return (
        <div className="banner" style={{
            backgroundImage: `URL(${imgBaseUrl}${movie.poster_path})`
        }}>
            <div className='banner-info'>
                <h1>{movie.title}</h1>
                <span>{movie.overview}</span>
            </div>
        </div>
    );
};

export default Banner;