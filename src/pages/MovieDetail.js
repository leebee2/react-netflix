import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { movieAction } from '../redux/actions/movieAction';
import Loadingbar from '../Modal/Loadingbar';
import { CastCard, MovieDetailInfo, MovieCard} from '../components';

import Carousel from 'react-multi-carousel';

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

const responsive2 = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 3
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const imgBaseUrl = 'https://image.tmdb.org/t/p/original/';


const MovieDetail = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { movieDetail, movieCredits, movieSimilar , loading} = useSelector(state => state.movie);

    const getMovieDetail = useCallback(() => {
        dispatch(movieAction.getMovieDetail(id));
    }, [id]);

    useEffect(() => {
        getMovieDetail();
    }, [getMovieDetail])

    return (
        <>
            {movieDetail == null || loading ?
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
                            <MovieDetailInfo movieDetail={movieDetail} movieCredits={movieCredits} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='detail-cast'>
                                <h4>주요 출연진</h4>
                                <Button variant="dark" onClick={() => nav(`/crews/${id}`)}>더보기 →</Button>
                            </div>
                            <Carousel responsive={responsive} >
                                {movieCredits?.cast?.slice(0, 10).map((item) =>
                                    <CastCard key={item.id} cast={item} />
                                )}
                            </Carousel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='detail-cast'>
                                <h4>이 영화는 어때요?</h4>
                            </div>
                            <Carousel responsive={responsive2} >
                                {movieSimilar?.map((item) => 
                                    <MovieCard key={item.id} item={item} page={'detail'} />
                                )}
                            </Carousel>
                        </Col>
                    </Row>
                </Container>)}
        </>
    );
};

export default MovieDetail;