import React from 'react';
import { Badge, Container, Col, Row} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const MovieCard = ({ item }) => {
    const { genreList } = useSelector(state => state.movie);
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

    return (
        <Link
            to={`/movie/${item.id}`}
            className='card'
            style={{
                backgroundImage: "url(" +
                    `${imgBaseUrl}${item.backdrop_path}` +
                    ")",
                height : "200px"
            }}>
            
            <Container className='overlay'>
                <Row>
                    <Col className='head'>
                        <p>{item.title}</p>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col>{item.genre_ids.map((id, index) =>
                        <Badge bg="danger" key={index}>
                            {genreList.find(item => item.id == id).name}
                        </Badge>)}
                    </Col>
                </Row>
                <Row>
                    <Col>{item.vote_average}</Col>
                    <Col>{item.adult ? '청불' : ''}</Col>
                </Row>
            </Container>

            {/* <div className='overlay'>
                <div className="items" />
                <div className='items head'>
                    <p>{item.title}</p>
                    <hr />
                </div>
                <div>{item.genre_ids.map((id, index) =>
                    <Badge bg="danger" key={index}>
                        {genreList.find(item => item.id == id).name}
                    </Badge>)}
                </div>
                <div>
                    <span>{item.vote_average}</span>
                    <span>{item.adult ? '청불' : ''}</span>
                </div>
            </div> */}
        </Link>
    );
};

export default MovieCard;