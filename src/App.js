/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';
import * as addAction from './actions/PostActions';
import uuid from 'uuid/v4';
import Article from './component/Articles';
import Audio from './component/Audio';
import Map from './component/Map';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      cat: '',
      url: '',
      UploadVideoUrl: '',
      videoUrl: null,
      isOpenModal: false,
      location: null,
      lat: 53.55,
      lng: 29.55
    }

  }
  componentDidMount() {
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAP1O3BWa3XxIxa1l64FhK9JLEanI-fnuM');
  }
  unloadJs = (src) =>{
      var ref = window.document.getElementsByTagName("script")[9];
          ref.parentNode.removeChild(ref);
    }
  loadJS = (src) => {
      var ref = window.document.getElementsByTagName("script")[0];
      var script = window.document.createElement("script");
      script.src = src;
      script.async = true;
      ref.parentNode.insertBefore(script, ref);
  }
  
  handleImageChange = (e) => {
      e.preventDefault();

    let reader = new FileReader(),
        file = e.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        let url = reader.result;
        // console.log(url,"change upload inside")

        if (url.match(/video/gi)){
          console.log("no image")
          this.setState({
            UploadVideoUrl: url
          })
          console.log(this.state.UploadVideoUrl ,"UploadVideoUrl")
        }
        else{
          this.setState({
            url: url
          })
        }
      }
    }

    videoUrl = (url) => {
      this.setState({
        videoUrl: url
      })
    }
    
 
  onSubmit = (e) => {
    e.preventDefault();

    let post = {
      title: this.refs.title.value,
      msg: this.refs.msg.value,
      file: this.state.url,
      videoFile: this.state.UploadVideoUrl,
      id: uuid(),
      likes:3,
      liked: false,
      bookmarked: false,
      videoUrl: this.state.videoUrl,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      location: this.state.location
    }
    this.props.actions.PostInput(post);
    document.querySelector(".inputForm").reset();
    this.setState({
      url: null,
      UploadVideoUrl: null,
      date:null,
      time:null,
      videoUrl:null,
      location: null
    })
    
  }

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

  getNavValue = (e) => {
    let nav = e.target.getAttribute("value");
    this.props.actions.FilterAction(nav);
  }
  openMapModal = () => {
    let open = !this.state.isOpenModal;
    this.setState({
      isOpenModal: open
    })
  }
  locationSelect = (value) =>{
    this.setState({
      location: value
    })
  }

  filteredPosts = ({category, posts, bookmarkList, likedList}) => {
        let filterPosts = "";  
        let path = this.props.location.pathname;
        if(path){
          switch (path){
            case "/" :
            filterPosts = posts.map((post, i) => {
              return post
            })
            return filterPosts;

            case "/bookmark" :
            filterPosts = bookmarkList.map((post,i) => {
              return post
            })
            return filterPosts;

            case "/liked" :
            filterPosts = likedList.map((post,i) => {
              return post
            })
            return filterPosts;
          } 
        }
        
        filterPosts = posts.map((post, i) => {
          return post
        })

        return filterPosts;
     
  }


  render() {
    const { category, posts, bookmarkList, likedList } = this.props;

    const filterPosts = this.filteredPosts({category, posts, bookmarkList, likedList})
 

    let newPosts = filterPosts.map((post, i) => {
      return <Article post={post} key={i} like={this.likeHandle}  bookmark={this.bookmarkHandle}/>
    })

    let bookmarked = this.props.bookmarkList.map((post,i) => {
      return <Article post={post} key={i} like={this.likeHandle} bookmark={this.bookmarkHandle}/>
    })

    let liked = this.props.likedList.map((post,i) => {
      return <Article post={post} key={i} like={this.likeHandle} liked={this.state.liked}  bookmark={this.bookmarkHandle}/>
    })

   
    return (
      <div className="App container">
        <div className="row">
          <div className="col-12">
            <h1 className="pageTitle">My Blog</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-7 col-sm-8">
            <div className="blog-wrapper">
              <form  className="inputForm" onSubmit={this.onSubmit}>
                <input className="form-control" ref="title" type="text" placeholder="Title here"/><br/>
                <textarea className="form-control" ref="msg" placeholder="Message here.."></textarea>
                
                <div className="tools">
                    <div className="upload">
                      <input type="file" ref="file" onChange={this.handleImageChange}/>
                      <label>
                        <span> Upload</span>
                      </label>
                    </div>
                    {/* upload file */}
                    <div className="locationBtn" onClick={this.openMapModal}>Select location</div><br/>
                    {
                      this.state.isOpenModal && <Map openModal={this.openMapModal} locate={this.locationSelect} />
                    }
                    <Audio videoUrl={this.videoUrl}/>
                </div>
                
                <input type="submit" value="submit" />
              </form>

              <div className="post-wrapper">

                  <div className="nav">
                      <span><Link value="all"  to="/">All posts</Link></span>
                      <span><Link value="liked"  to="/liked">Liked</Link></span>
                      <span><Link value="bookmarked"  to="/bookmark">Bookmarked</Link></span>
                  </div>
                  <div className="post">
                    { 
                      filterPosts.length > 0 ? filterPosts.map((post, i) => {
                        return <Article post={post} key={i} like={this.likeHandle}  bookmark={this.bookmarkHandle}/> 
                      }) : <div className="noItem">No item to show</div>
                    }
                  </div>
              </div>
            </div>
            {/* blog post */}
          </div>
          {/* col-12 */}
          <div className="col-6 col-md-5 col-sm-4">
            <div className="widget bookmarked">
              <h3>bookmarked</h3>
              <ul>
                {bookmarked}
              </ul>
            </div>
            <div className="widget liked">
              <h3>Liked</h3>
              <ul>
                {liked}
              </ul>
            </div>
          </div>
        </div>
        
       

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    bookmarkList: state.posts.bookmarkList,
    likedList: state.posts.likedList,
    category: state.posts.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(addAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
