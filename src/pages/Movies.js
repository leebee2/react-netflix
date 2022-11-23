import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { Container, Row, Col } from 'react-bootstrap';
import { SingleCard } from '../components';
import { Link } from 'react-router-dom';


const Movies = () => {
    const dispatch = useDispatch();
    const { movieNowPlay } = useSelector(state => state.movie);

    const getMovieNowPlay = useCallback(() => {
        dispatch(movieAction.getMovieNowPlay())
    }, [])

    useEffect(() => {
        getMovieNowPlay();
    }, [])

    return (
        <div className='movies-container'>
            <Container>
                <Row>
                    
                </Row>
                <Row>
                    {movieNowPlay.results != undefined &&
                        movieNowPlay.results.map((item) => {
                            return (
                                <Col lg={3}>
                                    <SingleCard key={item.id} item={item} />
                                </Col>
                            )
                        })}
                </Row>
            </Container>
        </div>
    );
};

export default Movies;