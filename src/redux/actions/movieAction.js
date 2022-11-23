import api from '../api';

const API_KEY = process.env.REACT_APP_MOVIE_KEY;

function getMovies() {
    return async(dispatch) => {
        try {
            dispatch({ type: 'GET_MOVIES_REQUEST' });

            const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
            const topRatedMovieApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`);
            const upcomingMovieApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`);
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=ko-KR`);

            let [popularMovies, topRatedMovies, upcomingMovies, genreList] = await Promise.all([popularMovieApi, topRatedMovieApi, upcomingMovieApi, genreApi]);

            dispatch({
                type: 'GET_MOVIE_SUCCESS',
                payload: {
                    popularMovies: popularMovies.data,
                    topRatedMovies: topRatedMovies.data,
                    upcomingMovies: upcomingMovies.data,
                    genreList: genreList.data.genres
                }
            })
        } catch (error) {
            dispatch({ type: 'GET_MOVIES_FAILURE' });
        }
    }
}

function getMovieVideo(id) {
    return async (dispatch) => {
        try {

            const movieVideoApi = await api.get(`/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`)

            dispatch({ type: 'GET_MOVIE_VIDEO', payload: { movieVideo: movieVideoApi.data.results[0] }})
        } catch (error) {
            console.log(error);
        }
    }
}

function getMovieDetail(id) {
    return async (dispatch, getState) => {
        try {
            const { genreList, MovieDetail } = getState().movie;

            if (MovieDetail != null) {
                dispatch({ type: 'GET_MOVIE_DETAIL_REFRESH' })
            }

            const movieDetailApi = await api.get(`/movie/${id}?api_key=${API_KEY}&language=ko-KR`)
            const movieCreditsApi = await api.get(`/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`)
            const movieSimilarApi = await api.get(`/movie/${id}/similar?api_key=${API_KEY}&language=ko-KR`)

            if (Object.keys(genreList).length === 0) { //화면 새로고침으로 인한 추가작업
                const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=ko-KR`);

                let [MovieDetailData, movieCredits, movieSimilar, genreList] = await Promise.all([movieDetailApi, movieCreditsApi, movieSimilarApi, genreApi]);

                dispatch({
                    type: 'GET_MOVIE_DETAIL_ADD_GENRE',
                    payload: {
                        movieDetail: MovieDetailData.data,
                        movieCredits: movieCredits.data,
                        movieSimilar: movieSimilar.data.results,
                        genreList: genreList.data.genres,
                    }
                })
            } else {
                let [MovieDetailData, movieCredits, movieSimilar] = await Promise.all([movieDetailApi, movieCreditsApi, movieSimilarApi]);

                dispatch({
                    type: 'GET_MOVIE_DETAIL',
                    payload: {
                        movieDetail: MovieDetailData.data,
                        movieCredits: movieCredits.data,
                        movieSimilar: movieSimilar.data.results,
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function getMovieNowPlay() {
    return async (dispatch) => {
        try {

            const MovieNowPlayApi = await api.get(`/movie/now_playing?api_key=${API_KEY}&page=1&language=ko-KR&region=KR`)

            dispatch({
                type: 'GET_MOVIE_NOW_PLAY',
                payload: { movieNowPlay : MovieNowPlayApi.data }
            })
        } catch (error) {
            console.log(error);
        }
    }
}
    

export const movieAction = { getMovies, getMovieVideo, getMovieDetail, getMovieNowPlay };