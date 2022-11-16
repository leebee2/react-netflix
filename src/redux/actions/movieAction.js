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

export const movieAction = { getMovies };