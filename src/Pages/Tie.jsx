import React, { Fragment } from 'react';

import './Home.css';

const Tie = () => {
    return (
        <Fragment>
            <div className="menu__content">
                <center>
                    <p style={{ color: 'white', fontSize: 50, margin: 0 }}>GameOVER</p>
                    <p style={{ color: 'white', fontSize: 80, margin: 0 }}>TIE</p>
                </center>
            </div>
        </Fragment>
    );
};

export default Tie;
