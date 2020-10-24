import React, { Fragment } from 'react';

import './Home.css';

const Incorrect = () => {
    return (
        <Fragment>
            <center>
                <div className="menu__content typewriter">
                    <p style={{ color: 'white', fontSize: "8vw", margin: 0 }}>Incorrect</p>
                </div>
            </center>
        </Fragment>
    );
};

export default Incorrect;
