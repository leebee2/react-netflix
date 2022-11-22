import React, { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { movieAction } from '../redux/actions/movieAction';
import Loadingbar from '../Modal/Loadingbar';


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CastCard } from '../components';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 9
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 7
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};
const imgBaseUrl = 'https://image.tmdb.org/t/p/original/';


const MovieDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { movieDetail, movieCredits } = useSelector(state => state.movie);
    const director = movieCredits?.crew?.filter(({ job }) => job === 'Director')[0].name

    const getMovieDetail = useCallback(() => {
        dispatch(movieAction.getMovieDetail(id, movieDetail));
    }, [id]);

    useEffect(() => {
        getMovieDetail();
    }, [getMovieDetail])

    return (
        <>
            {movieDetail == null ?
                (< Loadingbar loading={true} />)
                :
                (<Container className='detail-container'>
                    <Row>
                        <Col xl="6" lg="4">
                            <img src={`${imgBaseUrl}${movieDetail.poster_path}`}
                                className='detail-poster'
                                alt="movie poster"
                            />
                        </Col>
                        <Col xl="6" lg="8">
                            <h1>{movieDetail.title}</h1>
                            <div className='detail-origin-title'>
                                {movieDetail.original_title}, ({movieDetail.release_date.slice(0,4)})
                            </div>
                            <div>
                                {movieDetail.genres.map((item, index) =>
                                    <Badge className="detail-badge" bg="danger" key={index}>
                                        {item.name}
                                    </Badge>)}
                            </div>
                            <div className='detail-tag-line'>{movieDetail.tagline}</div>
                            <div className='detail-vote'>
                                <span>
                                    <span>
                                        <img width={20}
                                            src={process.env.PUBLIC_URL + `/img/imdb.png`}
                                            alt="imdb"
                                        />
                                    </span>
                                    {movieDetail.vote_average}
                                </span>
                                <span>
                                    <span><FontAwesomeIcon icon="fa-check-to-slot" /></span>
                                    {movieDetail.vote_count}
                                </span>
                            </div>
                            <hr />
                            <div>
                                <Badge bg="danger" className='detail-movie-info'>감독</Badge>
                                {(movieCredits?.crew?.filter(({ job }) => job === 'Director'))[0].name}
                            </div>
                            <div>
                                <Badge bg="danger" className='detail-movie-info'>제작예산</Badge>
                                ${Number(movieDetail.budget).toLocaleString()}
                            </div>
                            <div>
                                <Badge bg="danger" className='detail-movie-info'>수익</Badge>
                                ${Number(movieDetail.revenue).toLocaleString()}
                            </div>
                            <div>
                                <Badge bg="danger" className='detail-movie-info'>개봉일</Badge>
                                {movieDetail.release_date}
                            </div>
                            <div>
                                <Badge bg="danger" className='detail-movie-info'>러닝타임</Badge>
                                {movieDetail.runtime}분
                            </div>
                            <hr />
                            <div>
                                {movieDetail.overview}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4>출연진</h4>
                            <Carousel responsive={responsive} >
                                {movieCredits?.cast?.slice(0, 10).map((item) =>
                                    <CastCard key={item.id} cast={item} />
                                )}
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
                )}
        </>
    );
};

export default MovieDetail;