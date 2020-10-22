import { Button, Grid, FormControl, Input, InputLabel } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"
const ENDPOINT = "http://127.0.0.1:3000"
const socket = socketIOClient(ENDPOINT)


function App() {
    const [code, setCode] = useState("")
    const [username, setUsername] = useState("zhenk")
    const [users, setUsers] = useState({})

    useEffect(() => {
        socket.emit("username", {
            username: username,
        })

        socket.on("users", users => {
            setUsers(users)
            console.log()
        })

        socket.on("createRoom", room => {
            console.log(room)
            setCode(room.code)
        })

        socket.on("joinRoom", room => {
            console.log(room)
        })

        socket.on("question", data => {
            console.log(data)
        })

        socket.on("end", data => {
            console.log(data)
        })

        socket.on("error", data => {
            alert(data)
        })
    }, [])

    useEffect(()=>{
        socket.emit("username", {
            username: username,
        })
    }, [username])

    const createRoom = () => {
        socket.emit("createRoom", {
            host: username,
            timer: 10,
            international: false,
        })
    }

    const startGame = () => {
        socket.emit("startGame", {
            code: code
        })
    }

    const joinRoom = () => {
        socket.emit("joinRoom", {
            code: code
        })
    }

    return (
        <Grid container direction="column" justify="space-around" alignItems="center">
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input value={username} onChange={e => setUsername(e.target.value)}/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Lobby Code</InputLabel>
                <Input value={code} onChange={e => setCode(e.target.value)}/>
            </FormControl>
            <Button variant="contained" color="primary" onClick={createRoom}>createRoom</Button>
            <Button variant="contained" color="primary" onClick={startGame}>startGame</Button>
            <Button variant="contained" color="primary" onClick={joinRoom}>joinRoom</Button>
        </Grid>
    )
}

export default App;