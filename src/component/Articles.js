import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Location from './Location';

class Article extends Component {
    bookmark = () => {
        this.props.bookmark(this.props.post)
    }
    like = () => {
        this.props.like(this.props.post)
    }

    render() {
        const { post, singlePost } = this.props;
        return (
            <article id={post.id} className={singlePost && "singlePost"}>
                <h2>{!singlePost ? <Link to={`/post/${post.id}`}>{post.title}</Link> : post.title}</h2>
                <div className="msg">{post.msg}</div>
                {post.file && <img src={post.file} alt="" />}
                {post.videoFile && <video muted src={post.videoFile} width="200" height="150" controls />}
                {post.videoUrl && <video muted src={post.videoUrl} width="200" height="150" controls />}
                {post.location && <Location location={post.location} id={post.id} />}
                <div>Posted on {post.date} - {post.time}</div>
                <div>
                    <button className="btn btn-info" onClick={this.bookmark}>{post.bookmarked ? "Bookmarked" : "Add to Bookmark"}</button>&nbsp;
                    <button className="btn btn-info" onClick={this.like}>{post.likes} Like </button>
                </div>
            </article>
        )
    }
}


export default Article;