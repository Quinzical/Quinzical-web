import React, { Fragment, useEffect, useState } from 'react';

import './Home.css';

const Eject = ({ message }) => {
    const [text, setText] = useState("")
    
    return (
        <Fragment>
            <center>
                <div className="menu__content typewriter">
                    <p style={{ color: 'white', fontSize: "8vw", margin: 0 }}>ZHENK has been ejected</p>
                </div>
            </center>
        </Fragment>
    );
};

export default Eject;
