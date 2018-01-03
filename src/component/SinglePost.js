
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Article from './Articles';
import PageHeader from './PageHeader';

class SinglePost extends Component {
    render() {
        const singlePost = this.props.posts.filter((post) => post.id === this.props.postId);
        return (
            <div className="App container">
                <PageHeader/>
                <div className="row justify-content-md-center">
                    <div className="col col-8">
                        {singlePost && <Article post={singlePost[0]} key={singlePost[0].id} singlePost={true}/>}
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
  
  
  
  export default connect(mapStateToProps, null)(SinglePost);