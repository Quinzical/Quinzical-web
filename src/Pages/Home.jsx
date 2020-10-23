import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'
import Button from '../Components/Button';

import './Home.css';
import { useHistory } from 'react-router-dom';

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

const Home = () => {
    const history = useHistory()

    const [rooms, setRooms] = useState({})

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + "rooms").then(res => {
            setRooms(res.data)
        })
    }, [])

    return (
        <Fragment>
            <div className="menu__content">
                <p style={{ color: 'white', fontSize: 120, margin: 0 }}>QUINZICAL</p>
                {
                    Object.keys(rooms).map((value) => {
                        if (rooms[value].lobby) {
                            return <><br/><Button onClick={() => history.push('/' + value)}>{value}</Button></>
                        }
                    })
                }
            </div>
        </Fragment>
    );
};

export default Home;
