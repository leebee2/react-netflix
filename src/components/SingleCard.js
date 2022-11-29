import React from 'react';
import { Col, Badge, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleCard = ({ item }) => {
    const { genreList } = useSelector(state => state.movie);
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

    return (
        <Link to={`/movies/${item.id}`} className='single-card'>
            <div
                className="single-info"
                style={item.backdrop_path !== null ? {
                    backgroundImage: `url('${imgBaseUrl}${item.backdrop_path}')`,
                    height: '300px'
                } : {}}>
                <Container>
                    <Row>
                        <Col className='single-header'>
                            {item.poster_path !== null && <img
                                alt='poster'
                                className="locandina"
                                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                            />}
                            <h2>{item.title}<span>({item.release_date.substr(0, 4)})</span></h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                            {item.genre_ids.map((id, index) =>
                                <Badge bg="danger" key={index}>
                                    {genreList.find(item => item.id === id).name}
                                </Badge>)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>
                                {item.overview.length > 0 ? item.overview.substring(0, 50) + "..." : ""}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Link >
    );
};

export default SingleCard;