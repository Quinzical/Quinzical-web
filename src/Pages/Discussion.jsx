import React, { Fragment } from 'react';
import './Home.css';
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

const Discussion = ({ room }) => {
    console.log(users)

    return (
        <Fragment>
            <div className="menu__content">
                <p style={{ color: 'white', fontSize: 120, margin: 0 }}>Remaining:</p>
                <div style={{ margin: 10, marginTop: 50, marginBottom: 50 }}>
                    {room?.users?.map(user => {
                        return <p style={{ color: userID === user ? '#01ff00' : 'white', fontSize: 50 }} key={user}>{users[user]}</p>
                    })}
                </div>
                <div className="menu__buttons">
                    <p style={{ color: 'white', fontSize: 60, margin: 0 }}>waiting for host...</p>
                </div>
            </div>
        </Fragment>
    );
};

export default Discussion;
