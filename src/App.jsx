import { Button, Grid, FormControl, Input, InputLabel } from "@material-ui/core"
import React, { useEffect, useState, Suspense } from "react"
import socketIOClient from "socket.io-client"
import Stars from './Components/Star'
import prerender from './Utils/prerender'

import Home from "./Pages/Home"
import Lobby from "./Pages/Lobby"
import Question from "./Pages/Question"

const ENDPOINT = "http://127.0.0.1:3000"
const socket = socketIOClient(ENDPOINT)

const states = {
    LOGIN: 'login',
    LOBBY: 'lobby',
    COUNTER: 'counter',
    QUESTION: 'question',
    KILL: 'kill',
    WINNER: 'winner'
}

const App = () => {
    const [code, setCode] = useState("")
    const [username, setUsername] = useState("")
    const [users, setUsers] = useState({})
    const [room, setRoom] = useState(null)
    const [state, setState] = useState(states.LOGIN)

    useEffect(() => {
        socket.on("users", users => {
            setUsers(users)
            console.log()
        })

        socket.on("createRoom", room => {
            setRoom(room)
            setCode(room.code)
        })

        socket.on("joinRoom", room => {
            setRoom(room)
            console.log(room)
        })

        socket.on("question", ({ question, qualifer, answer }) => {
        })

        socket.on("end", room => {
            setRoom(room)
        })

        socket.on("error", data => {
            alert(data)
        })
    }, [])

    useEffect(() => {
        socket.emit("username", {
            username: username,
        })
    }, [username])

    const play = (username) => {
        setUsername(username)
        socket.emit("username", {
            username: username,
        })
        setState(states.LOBBY)
    }

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
        <section className="menu">
            <title>QUINZICAL</title>
            <meta
                name="description"
                content="Quinzical app made by Cheng-Zhen Yang and Maggie Pedersen"
            />
            {!prerender &&
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>
            }
            {state===states.LOGIN && <Home play={play}/>}
            {state===states.LOBBY && <Lobby play={play}/>}
        </section>
    )

    return (
        <Grid container direction="column" justify="space-around" alignItems="center">
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input value={username} onChange={e => setUsername(e.target.value)} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Lobby Code</InputLabel>
                <Input value={code} onChange={e => setCode(e.target.value)} />
            </FormControl>
            <Button variant="contained" color="primary" onClick={createRoom}>createRoom</Button>
            <Button variant="contained" color="primary" onClick={startGame}>startGame</Button>
            <Button variant="contained" color="primary" onClick={joinRoom}>joinRoom</Button>
        </Grid>
    )
}

export default App;