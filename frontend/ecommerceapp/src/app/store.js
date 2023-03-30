import { configureStore } from "@reduxjs/toolkit";
// import homePageReducer 

export default configureStore({
    reducer: {
        // posts: postsReducer,
        // comments: commentsReducer,
        // post: postReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})