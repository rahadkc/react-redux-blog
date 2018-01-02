
export const PostInput = (data) => {
    console.log(data, "post action data")
    return {
        type: "post_input",
        payload: data
    }
}

export const LikeAdd = (data) => {
    console.log(data, "post action data")
    return {
        type: "post_like",
        payload: data
    }
}

export const BookmarkAdd = (data) => {
    console.log(data, "post action data")
    return {
        type: "post_bookmarked",
        payload: data
    }
}

export const FilterAction = (data) => {
    console.log(data, "post action data")
    return {
        type: "post_filter",
        payload: data
    }
}
