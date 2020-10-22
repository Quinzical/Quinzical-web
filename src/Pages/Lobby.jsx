import React, { useState, Fragment } from 'react';

import Button from '../Components/Button';

import './Home.css';
import Input from '../Components/Input';
import { useParams } from 'react-router-dom';

/*
room = {
    code: newCode,
    host: host,
    timer: timer,
    international: international,
    users: [host],
    wrong: [],
    lobby: true,
    question: "",
    answer: "",
} */

const Lobby = ({ room, userID, users, start }) => {
    let { code } = useParams()
    console.log(users)

    return (
        <Fragment>
            <div className="menu__content">
                <p style={{ color: 'white', fontSize: 120, margin: 0 }}>Lobby: {code}</p>
                <p style={{ color: 'white', fontSize: 40, margin: 0 }}>Timer: {room?.timer/1000} sec</p>
                <p style={{ color: 'white', fontSize: 40, margin: 0 }}>International: {room?.international? 'True': 'False'}</p>
                <br/>
                <p style={{ color: 'white', fontSize: 40, margin: 0 }}>Users: </p>
                <div style={{ margin: 10, marginTop: 50, marginBottom: 50 }}>
                    {room?.users?.map(user => {
                        return <p style={{ color: userID===user? '#01ff00':'white', fontSize: 50}} key={user}>{users[user]}</p>
                    })}
                </div>
                <div className="menu__buttons">
                    <p style={{ color: 'white', fontSize: 60, margin: 0 }}>waiting for host...</p>
                </div>
            </div>
        </Fragment>
    );
};

export default Lobby;
