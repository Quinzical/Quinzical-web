import React, { Fragment } from 'react';

import './Home.css';

const Win = ({current, user, users}) => {
    return (
        <Fragment>
            <div className="menu__content">
                <center>
                    <p style={{ color: 'white', fontSize: 50, margin: 0 }}>Winner</p>
                    <p style={{ color: current===user?'#01ff00':'white', fontSize: 80, margin: 0 }}>{users[user]}</p>
                </center>
            </div>
        </Fragment>
    );
};

export default Win;
