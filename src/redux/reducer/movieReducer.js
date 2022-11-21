let initialState = {
    loading: false,
    popularMovies: {},
    topRatedMovies: {},
    upcomingMovies: {},
    genreList: {},
    movieDetail : null,
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
            return { ...state, movieDetail: payload.movieDetail }
        default:
            return {...state}
    }
}

export default movieReducer;