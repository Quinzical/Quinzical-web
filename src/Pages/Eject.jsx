import React, { Fragment, useEffect, useState } from 'react';

import './Home.css';

const Eject = ({ eject }) => {
    return (
        <Fragment>
            <center>
                <div className="menu__content typewriter">
                    <p style={{ color: 'white', fontSize: "8vw", margin: 0 }}>{eject}</p>
                </div>
            </center>
        </Fragment>
    );
};

export default Eject;
