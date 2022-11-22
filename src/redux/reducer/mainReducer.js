let initialState = {
    mainVideoClick : false,
}

function movieReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "MAIN_VIDEO_FLAG":
            return { ...state, mainVideoClick: payload.mainVideoClick }
        default:
            return { ...state }
    }
}

export default movieReducer;