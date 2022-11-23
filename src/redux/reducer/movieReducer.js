let initialState = {
    loading: false,
    popularMovies: {},
    topRatedMovies: {},
    upcomingMovies: {},
    genreList: {},
    movieVideo: undefined,
    movieDetail: null,
    movieCredits: {},
    movieSimilar: {},
}

function movieReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'GET_MOVIES_REQUEST':
            return {...state, loading : true}
        case 'GET_MOVIES_FAILURE':
            return { ...state, loading: false }
        case 'GET_MOVIE_SUCCESS':
            return {
                ...state,
                popularMovies: payload.popularMovies,
                topRatedMovies: payload.topRatedMovies,
                upcomingMovies: payload.upcomingMovies,
                genreList: payload.genreList,
                loading: false,
            }
        case 'GET_MOVIE_VIDEO': 
            return { ...state, movieVideo: payload.movieVideo }
        case 'GET_MOVIE_DETAIL':
            return {
                ...state,
                movieDetail: payload.movieDetail,
                movieCredits: payload.movieCredits,
                movieSimilar: payload.movieSimilar
            }
        case 'GET_MOVIE_DETAIL_REFRESH':
            return {
                ...state,
                movieDetail: null,
                movieCredits: {},
                movieSimilar: {},
            }
        default:
            return {...state}
    }
}

export default movieReducer;