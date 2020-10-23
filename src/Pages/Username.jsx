import React, { useState, Fragment } from 'react';

import Button from '../Components/Button';

import './Home.css';
import Input from '../Components/Input';

const Username = ({ play }) => {
    const [username, setUsername] = useState('')

    return (
        <Fragment>
            <div className="menu__content">
                <p style={{ color: 'white', fontSize: 120, margin: 0 }}>QUINZICAL</p>
                <div style={{ margin: 10, marginTop: 50, marginBottom: 50 }}>
                    <Input
                        className="menu__username"
                        placeholder="Username"
                        pattern=".{1,}"
                        value={username}
                        style={{ margin: 'auto', left: -6, maxWidth: 400, backgroundColor: "black" }}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="menu__buttons">
                    <Button onClick={() => play(username)}>Play</Button>
                </div>
            </div>
        </Fragment>
    );
};

export default Username;
