import React from 'react';

class Webcam extends React.Component {
  
  render() {
    return (
      <div>
        <video muted src={this.props.src} width={this.props.width ? this.props.width : '40'} height={this.props.height ? this.props.height : '40'} />
        {/* <video autoPlay="true" muted src={this.props.newSrc} width="40" height="40"/> */}
      </div>
    )
  }
}

export default Webcam;
