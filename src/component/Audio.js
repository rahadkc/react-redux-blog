import React from 'react';
import { connect } from 'react-redux';
import { captureUserMedia } from './AudioUtils';
import Webcam from './Webcam';
import RecordRTC from 'recordrtc';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia);

class RecordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recordVideo: null,
      playVideo: null,
      src: null,
      newSrc: null,
      uploadSuccess: null,
      uploading: false,
      recording: false,
      openVideoModal: false
    };

    this.requestUserMedia = this.requestUserMedia.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.openModalHandle = this.openModalHandle.bind(this);
  }

  componentDidMount() {
    if(!hasGetUserMedia) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    this.requestUserMedia();
  }

  requestUserMedia() {
    console.log('requestUserMedia')
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
      console.log('setting state', this.state.src)
    });
  }

  // stopRecordingCallback = () => {
  //     var blob = recorder.getBlob();
  //     audio.src = URL.createObjectURL(blob);
  //     audio.play();
  //     recorder.microphone.stop();
  // }
  startRecord() {
    this.setState({
      recording: true
    })
    captureUserMedia((stream) => {
      this.setState({
        recordVideo: RecordRTC(stream, { type: 'video' })
      })
      this.state.recordVideo.startRecording();
    });
  }
  stopRecord() {
    this.state.recordVideo.stopRecording((stream) => {
      let params = {
        type: 'video/webm',
        data: this.state.recordVideo.blob,
        id: Math.floor(Math.random()*90000) + 10000
      }
    //   console.log(stream, "params data")
      this.setState({ newSrc: stream, recording: false });
      this.props.videoUrl(this.state.newSrc);

      console.log(this.props.videoUrl, "this.props.videoUrl")
      // this.state.recordVideo.play();

      // S3Upload(params)
      // .then((success) => {
      //   console.log('enter then statement')
      //   if(success) {
      //     console.log(success)
      //     this.setState({ uploadSuccess: true, uploading: false });
      //   }
      // }, (error) => {
      //   alert(error, 'error occurred. check your aws settings and try again.')
      // })
    });
  }

  openModalHandle(){
    let isOpen = !this.state.openVideoModal;
    this.setState({
      openVideoModal: isOpen,
      recording: false
    })
  }


  render() {
    return(
      <div className="videoRecord">
        {this.state.openVideoModal && <div className="popupModal">
              <div className="modalContent">
                  
                  <div><Webcam src={this.state.src} newSrc={this.state.newSrc} width="100%" height="350px"/></div>
                  <div className="modal-footer">
                  <button type="button" className="btn btn-danger" onClick={this.openModalHandle}>Close</button>
                  <button type="button" className={'btn btn-primary ' + (this.state.recording && 'disabled')} onClick={this.startRecord}>{this.state.recording ? 'Recording..' : 'Record Video'}</button>
                  <button type="button" className={'btn btn-success ' + (!this.state.recording && 'disabled')} onClick={this.stopRecord}>Save</button>
                  </div>
              </div>
          </div>}
        <span className="btn btn-success record" onClick={this.openModalHandle}><i className="fa fa-video-camera" aria-hidden="true"></i> Record video</span>
      </div>
    )
  }
}

export default connect()(RecordPage);

