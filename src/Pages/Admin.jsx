import React, { Fragment, useState, useEffect } from 'react';
import socketIOClient from "socket.io-client"

const ENDPOINT = process.env.REACT_APP_API
const socket = socketIOClient(ENDPOINT)



const Admin = () => {

    useEffect(() => {
        socket.on("question", question => {
            setData([...data, question.answer])
        })
        socket.emit("admin")
    }, [])
    const [data, setData] = useState([])
    return (
        <Fragment>
            <center>
                {data.map(e => {
                    return <p style={{ color: 'white', fontSize: "8vw", margin: 0 }}>e.answer</p>;
                })}
            </center>
        </Fragment>
    );
};

export default Admin;
