import React, { Component } from 'react';
import { connect } from 'react-redux';

class Bookmark extends Component {
    state = {  }
    render() {
        return (
            <div>Bookmark page</div>
        );
    }
}

export default connect()(Bookmark);