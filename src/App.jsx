import { Button, Grid, FormControl, Input, InputLabel } from "@material-ui/core"
import React, { useEffect, useState, Suspense } from "react"
import socketIOClient from "socket.io-client"
import Star from './Components/Star'
import prerender from './Utils/prerender'

import Home from "./Pages/Home"
import Lobby from "./Pages/Lobby"
import { useHistory, useParams } from "react-router-dom"
import Countdown from "./Pages/Countdown"
import Question from "./Pages/Question"
import Eject from "./Pages/Eject"

const ENDPOINT = "http://127.0.0.1:3000"
const socket = socketIOClient(ENDPOINT)

const states = {
    LOGIN: 'login',
    LOBBY: 'lobby',
    COUNTER: 'counter',
    QUESTION: 'question',
    EJECT: 'eject',
    DISCUSSION: 'discussion',
    WINNER: 'winner'
}
const App = () => {
    let { code } = useParams()
    const [username, setUsername] = useState("")
    const [users, setUsers] = useState({})
    const [room, setRoom] = useState(null)
    const [state, setState] = useState(states.EJECT)
    const [question, setQuestion] = useState("")
    const [qualifer, setQualifer] = useState("")
    const [answer, setAnswer] = useState("")

    const history = useHistory()

    useEffect(() => {
        console.log(code)
        socket.on("users", users => {
            setUsers(users)
            console.log()
        })

        /*socket.on("createRoom", room => {
            setRoom(room)
            setCode(room.code)
        })*/

        socket.on("joinRoom", room => {
            setRoom(room)
            console.log(room)
        })
        
        socket.on("startingGame", room => {
            console.log("starting")
            setState(states.COUNTER)
        })


        socket.on("question", ({ question, qualifer, answer }) => {
            setQuestion(question)
            setQualifer(qualifer)
            setAnswer(answer)
            setState(states.QUESTION)
        })

        socket.on("discussion", ({}) => {
            setState(states.DISCUSSION)
        })

        socket.on("end", room => {
            setRoom(room)
        })

        socket.on("error", data => {
            alert(data)
            history.push('/')
        })
    }, [])

    useEffect(() => {
        socket.emit("username", {
            username: username,
        })
    }, [username])

    const play = (username) => {
        if (username === "") {
            alert("username not set")
            return
        }
        setUsername(username)
        socket.emit("username", {
            username: username,
        })
        setState(states.LOBBY)
        joinRoom()
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
                    <Star />
                </Suspense>
            }
            {state === states.LOGIN && <Home play={play} />}
            {state === states.LOBBY && <Lobby room={room} userID={socket.id} users={users} start={startGame} />}
            {state === states.COUNTER && <Countdown/>}
            {state === states.QUESTION && <Question timer={10000} qualifer={qualifer} question={question} submit={answer=>setAnswer(answer)}/>}
            {state === states.EJECT && <Eject/>}
        </section>
    )
}

export default App;