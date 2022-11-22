import api from '../api';

const API_KEY = process.env.REACT_APP_MOVIE_KEY;

function getMovies() {
    return async(dispatch) => {
        try {
            dispatch({ type: 'GET_MOVIES_REQUEST' });

            const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=ko&page=1`);
            const topRatedMovieApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=ko&page=1`);
            const upcomingMovieApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=ko&page=1`);
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=ko`);

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

            const movieVideoApi = await api.get(`/movie/${id}/videos?api_key=${API_KEY}&language=ko`)

            dispatch({ type: 'GET_MOVIE_VIDEO', payload: { movieVideo: movieVideoApi.data.results[0] }})
        } catch (error) {
            console.log(error);
        }
    }
}

function getMovieDetail(id, movieData) {
    return async (dispatch) => {
        try {
            if (movieData != null) {
                dispatch({ type: 'GET_MOVIE_DETAIL_REFRESH' })
            }

            const movieDetailApi = await api.get(`/movie/${id}?api_key=${API_KEY}&language=ko`)
            const movieCreditsApi = await api.get(`/movie/${id}/credits?api_key=${API_KEY}&language=KO`)

            let [movieDetail, movieCredits] = await Promise.all([movieDetailApi, movieCreditsApi]);

            dispatch({
                type: 'GET_MOVIE_DETAIL',
                payload: {
                    movieDetail: movieDetail.data,
                    movieCredits: movieCredits.data,
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const movieAction = { getMovies, getMovieVideo, getMovieDetail };