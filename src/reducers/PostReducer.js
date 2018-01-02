const initialState = {
    posts: [],
    likedList: [],
    bookmarkList: [],
    category: null
}
export default function reducer(state=initialState, action){
    switch(action.type){
        case "post_input": {
            return {...state, posts: [ action.payload ,...state.posts]}
        }
        case "post_like": {
            const posts = state.posts.map((item) => {
                const post = action.payload.id === item.id;
                return post ? item = action.payload : item;
            });

            const likedList = state.posts.filter((item) => {
              return item.liked
            })
            
            return {
                ...state,
                posts,
                likedList
            }
        }
        case "post_bookmarked": {
            const posts = state.posts.map((item) => {
                const post = action.payload.id === item.id;
                return post ? item = action.payload : item;
            });

            let bookmarkList = state.posts.filter((item) => {
              return item.bookmarked
            })

            console.log(bookmarkList, "bookmarkList reducer")
            
            return {
                ...state,
                posts,
                bookmarkList
            }
        }
        case "post_filter": {
            return {...state, category: action.payload}
        }
    }
    return state;
}