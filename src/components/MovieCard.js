import React from 'react';
import { Badge, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const MovieCard = ({ item }) => {
    const { genreList } = useSelector(state => state.movie);
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

    return (
        <div className='card'
            style={{
                backgroundImage: `url('${imgBaseUrl}${item.poster_path}')`,
            }}>
            <div className='overlay'>
                <div className='head'>{item.title}</div>
                <div>{item.genre_ids.map((id, index) =>
                    <Badge bg="danger" key={index}>
                        {genreList.find(item => item.id == id).name}
                    </Badge>)}
                </div>
                <div>
                    <span>{item.vote_average}</span>
                    <span>{item.adult ? '청불' : ''}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;