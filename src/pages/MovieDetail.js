import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { movieAction } from '../redux/actions/movieAction';
import Loadingbar from '../Modal/Loadingbar';


const MovieDetail = () => {
    const dispatch = useDispatch();
    const imgBaseUrl = 'https://image.tmdb.org/t/p/original/';
    const { id } = useParams();
    const { movieDetail } = useSelector(state => state.movie);


    useEffect(() => {
        dispatch(movieAction.getMovieDetail(id));
    }, [])

    return (
        <>
            {movieDetail == null ?
                (< Loadingbar loading={true} />)
                :
                (<Container style={{ paddingTop: '80px' }}>
                    <Row>
                        <Col xl="6" lg="4">
                            <img src={`${imgBaseUrl}${movieDetail.poster_path}`}
                                alt="movie poster" style={{ width: '100%', height: '100%' }} />
                        </Col>
                        <Col xl="6" lg="8">
                            <div>
                                {movieDetail.genres.map((item, index) =>
                                    <Badge bg="danger" key={index}>
                                        {item.name}
                                    </Badge>)}
                            </div>
                            <h1>{movieDetail.title}</h1>
                            <div>{movieDetail.tagline}</div>
                            <div>
                                <img width={20}
                                    src={process.env.PUBLIC_URL + `/img/imdb.png`}
                                    alt="imdb"
                                />
                                {movieDetail.vote_average}
                            </div>
                            <div>
                                <FontAwesomeIcon icon="fa-check-to-slot" />
                                {movieDetail.vote_count}
                            </div>
                            <hr />
                            <div>
                                제작예산 : {movieDetail.budget}
                            </div>
                            <div>
                                수익 : {movieDetail.budget}
                            </div>
                            <div>
                                개봉일 : {movieDetail.release_date}
                            </div>
                            <div>
                                러닝타임 : {movieDetail.runtime}
                            </div>
                            <hr />
                            <div>
                                {movieDetail.overview}
                            </div>
                        </Col>
                    </Row>
                </Container>
                )}
        </>
    );
};

export default MovieDetail;