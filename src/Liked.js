import React, { Component } from 'react';
import { connect } from 'react-redux';

class Liked extends Component {
    state = {  }
    render() {
        return (
            <div>LIked page</div>
        );
    }
}

export default connect()(Liked);