import React from 'react';
import { Badge, Container, Col, Row} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons'



const MovieCard = ({ item }) => {
    const { genreList } = useSelector(state => state.movie);
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

    return (
        <Link
            to={`/movie/${item.id}`}
            className='card'
            style={{
                backgroundImage: "url(" + `${imgBaseUrl}${item.backdrop_path}`+")",
                height : "220px"
            }}>
            
            <Container className='overlay'>
                <Row>
                    <Col className='head'>
                        <p>{item.title}<span>({item.release_date.substr(0, 4)})</span></p>
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
                <Row className='card-icon-row'>
                    <Col className='card-text'>
                        <img width={20}
                            src={process.env.PUBLIC_URL + `/img/imdb.png`}
                            alt="imdb"
                        />
                        {item.vote_average}
                    </Col>
                    <Col className='card-text'>
                        <FontAwesomeIcon icon={faCheckToSlot} />
                        {item.vote_count}
                    </Col>
                    <Col sm={5}>
                    </Col>
                </Row>
            </Container>
        </Link>
    );
};

export default MovieCard;