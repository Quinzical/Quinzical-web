import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000";

function App() {
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("", data => {
            console.log(data)
        });
    }, []);

    return (
        <p>
        </p>
    );
}

export default App;