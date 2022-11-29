import React, { useCallback, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "react-js-pagination";
import { Container, Row, Col, Form } from 'react-bootstrap';

import { movieAction } from '../redux/actions/movieAction';
import { StoreContext } from '../redux/StoreContext';
import { SingleCard } from '../components';
import Loadingbar from '../Modal/Loadingbar';


const MoviesPage = ({type}) => {
    const dispatch = useDispatch();
    const { keyword, activePage, selectGenre } = useContext(StoreContext);
    const { movieNowPlay, SearchMovies, loading, genreList } = useSelector(state => state.movie);
    const movieData = type === 'all' ? SearchMovies : movieNowPlay;

    const getMoviesData = useCallback(() => {
        if (type === 'all') {
            dispatch(movieAction.getSearchMovies(keyword[0], activePage[0], selectGenre[0]))
        } else {
            dispatch(movieAction.getMovieNowPlay(activePage[0], selectGenre[0]))
        }

    }, [activePage, dispatch, keyword, selectGenre, type])


    const handlePageChange = (pageNumber) => {
        if (activePage !== pageNumber) {
            activePage[1](pageNumber);
        }
    }

    const handleGenreChage = (e) => {
        let select = e.target.value;
        selectGenre[1](select)

        if (keyword[0] != '') {
            keyword[1]('')
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        getMoviesData();
    }, [getMoviesData])


    return (
        <div className='now-movies-container'>
            {loading ?
                <Loadingbar loading={loading} />
                :
                <Container>
                    <Row>
                        <Col className='now-movies-bar'>
                            <h2>{type === 'all' ? '영화' : '현재 상영 영화'}</h2>
                            <Form.Select aria-label="장르" value={selectGenre[0]} onChange={(e) => handleGenreChage(e)}>
                                <option value={0}>장르 전체</option>
                                {movieData.results != undefined && genreList?.map((item) =>
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        {movieData?.results?.length > 0 ?
                            movieData.results.map((item) => {
                                return (
                                    <Col key={item.id} lg={3}>
                                        <SingleCard item={item} />
                                    </Col>
                                )
                            })
                            :
                            <Col>
                                <div className='now-movies-none'>해당 영화가 존재하지 않습니다.</div>
                            </Col>
                        }
                    </Row>
                    <Row>
                        <Col>
                            {movieData?.total_results !== 0 &&
                                <Pagination
                                    className='pagination'
                                    activePage={activePage[0]}
                                    itemsCountPerPage={20}
                                totalItemsCount={movieData.total_results !== undefined ? movieData.total_results : 0}
                                    pageRangeDisplayed={5}
                                    onChange={handlePageChange}
                                />}
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    );
};

export default MoviesPage;