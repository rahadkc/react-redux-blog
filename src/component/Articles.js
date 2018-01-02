import React, { Component } from 'react';
import { connect } from 'react-redux';
import Location from './Location';

class Article extends Component {
    bookmark = () => {
        this.props.bookmark(this.props.post)
    }
    like = () => {
        this.props.like(this.props.post)
    }

    render() {
        const { post, latlng } = this.props;
        return (
            <article id={post.id}>
                <h2>{post.title}</h2>
                <div className="msg">{post.msg}</div>
                {post.file && <img src={post.file} alt="Image" />}
                {post.videoFile && <video muted src={post.videoFile} width="200" height="150" controls />}
                {post.videoUrl && <video muted src={post.videoUrl} width="200" height="150" controls />}
                {post.location && <Location location={post.location} id={post.id} />}
                <div>Posted on {post.date} - {post.time}</div>
                <div>
                    <button onClick={this.bookmark}>{post.bookmarked ? "Bookmarked" : "Add to Bookmark"}</button>
                    <button onClick={this.like}>{post.likes} Like </button>
                </div>
            </article>
        )
    }
}


export default Article;