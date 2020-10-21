import { Button, Container, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core"
import React, { useEffect } from "react"
import socketIOClient from "socket.io-client"
const ENDPOINT = "http://127.0.0.1:3000"
const socket = socketIOClient(ENDPOINT)


function App() {
    useEffect(() => {
        socket.on("createRoom", newRoomID => {
            console.log(newRoomID)
        })

        socket.on("error", data => {
            alert(data)
        })
    }, [])

    const createRoom = () => {
        socket.emit("createRoom", {
            host: "myname",
            timer: 10,

        })
    }

    const startGame = () => {
        socket.emit("startGame", {
            username: "myname",
            code: ""
        })
    }

    return (
        <Container>
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
            <Button variant="contained" color="primary" primary onClick={createRoom}>createRoom</Button>
            <Button variant="contained" color="primary" onClick={startGame}>startGame</Button>
        </Container>
    )
}

export default App;