
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addAction from '../actions/PostActions';
import Article from './Articles';
import PageHeader from './PageHeader';

class SinglePost extends Component {
    likeHandle = (selectPost) => {
        this.props.posts.map((post)=>{
            let like =  !post.liked;
            if(post.id === selectPost.id){
                !post.liked ? post.likes++ : post.likes--; 
                post.liked = like;
                this.props.actions.LikeAdd(post);
            }  
        })
      }
      bookmarkHandle = (selectPost) => {
        this.props.posts.map((post)=>{
            let bookmark = !post.bookmarked;
            if(post.id === selectPost.id){
                post.bookmarked = bookmark;
                this.props.actions.BookmarkAdd(post)
            }  
        })
      }
    render() {
        const singlePost = this.props.posts.filter((post) => post.id === this.props.postId);
        return (
            <div className="App container">
                <PageHeader/>
                <div className="row justify-content-md-center">
                    <div className="col col-8">
                        {singlePost.length ? <Article post={singlePost[0]} key={singlePost[0].id} singlePost={true} like={this.likeHandle}  bookmark={this.bookmarkHandle}/> : <div className="noItem">Sorry, No item to show</div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const postId = ownProps.match.params.id;
    return {
        postId,
        posts: state.posts.posts
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(addAction, dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);