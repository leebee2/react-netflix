let initialState = {
    loading: false,
    popularMovies: {},
    topRatedMovies: {},
    upcomingMovies: {},
    genreList: {},
    movieVideo: undefined,
    movieDetail: null,
    movieCredits: {},
    movieSimilar: [],
    movieNowPlay: [],
    SearchMovies : {},
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
                movieSimilar: payload.movieSimilar,
                loading: false,
            }
        case 'GET_MOVIE_DETAIL_ADD_GENRE':
            return {
                ...state,
                movieDetail: payload.movieDetail,
                movieCredits: payload.movieCredits,
                movieSimilar: payload.movieSimilar,
                genreList: payload.genreList,
                loading: false,
            }
        case 'GET_MOVIE_DETAIL_REFRESH':
            return {
                ...state,
                movieDetail: null,
                movieCredits: {},
                movieSimilar: {},
                loading: true,
            }
        case 'GET_MOVIE_NOW_PLAY': 
            return {
                ...state,
                movieNowPlay: payload.movieNowPlay,
                loading: false,
            }
        case 'GET_MOVIE_NOW_PLAY_ADD_GENRE':
            return {
                ...state,
                movieNowPlay: payload.movieNowPlay,
                genreList: payload.genreList,
                loading: false,
            }
        case 'GET_SEARCH_MOVIE':
            return {
                ...state,
                SearchMovies: payload.SearchMovies,
                loading: false,
            }
        case 'GET_SEARCH_MOVIE_ADD_GENRE':
            return {
                ...state,
                SearchMovies: payload.SearchMovies,
                genreList: payload.genreList,
                loading: false,
            }

        default:
            return {...state}
    }
}

export default movieReducer;