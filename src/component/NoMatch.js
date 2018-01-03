import React from 'react';

const NoMatch = ({location}) => {
    const errorStyle = {
        'textAlign': 'center',
        'padding': "30px"
    }
    return(
        <div style={errorStyle}>
            <br /><br />
            <img src="https://media.giphy.com/media/Ldy6lWNFQritG/giphy_s.gif" className="static" alt="" />
            <span className="info"><b>{location.pathname}</b> Sorry, there is nothing in this link!</span>
        </div>
    )
};

export default NoMatch;