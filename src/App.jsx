import React, { useEffect, useState, Suspense } from "react"
import socketIOClient from "socket.io-client"
import Star from './Components/Star'
import prerender from './Utils/prerender'

import Username from "./Pages/Username"
import Lobby from "./Pages/Lobby"
import { useHistory, useParams } from "react-router-dom"
import Countdown from "./Pages/Countdown"
import Question from "./Pages/Question"
import Eject from "./Pages/Eject"
import Discussion from "./Pages/Discussion"

const ENDPOINT = process.env.REACT_APP_API
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


const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const App = () => {
    let { code } = useParams()
    const [username, setUsername] = useState("")
    const [users, setUsers] = useState({})
    const [room, setRoom] = useState(null)
    const [state, setState] = useState(states.LOGIN)

    let playing = false;

    const [eject, setEject] = useState("Incorrect")
    const [question, setQuestion] = useState("")
    const [qualifier, setQualifier] = useState("")
    const [answer, setAnswer] = useState("")

    const history = useHistory()

    useEffect(() => {
        console.log(code)
        socket.on("users", users => {
            setUsers(users)
        })

        /*socket.on("createRoom", room => {
            setRoom(room)
            setCode(room.code)
        })*/

        socket.on("joinRoom", room => {
            playing = true
            setRoom(room)
        })

        socket.on("startingGame", room => {
            if (playing) {
                console.log("starting")
                setState(states.COUNTER)
            }
        })


        socket.on("question", ({ question, qualifier, answer }) => {
            if (playing) {
                setQuestion(question)
                setQualifier(qualifier)
                setAnswer(answer)
                setState(states.QUESTION)
            }
        })

        socket.on("end", async room => {
            if (playing || state != states.DISCUSSION) {
                setState(states.EJECT)
                console.log(room)
                if (room.correct.includes(socket.id)) {

                } else {

                }
                setRoom(room)
                await timeout(3000)
                setState(states.DISCUSSION)
            }
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

    const sendAnswer = (answer) => {
        socket.emit("answer", {
            code: code,
            answer: answer
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
            {state === states.LOGIN && <Username play={play} />}
            {state === states.LOBBY && <Lobby room={room} userID={socket.id} users={users} start={startGame} />}
            {state === states.COUNTER && <Countdown />}
            {state === states.QUESTION && <Question playing={playing} timer={room.timer} qualifier={qualifier} question={question} answer={answer} submit={answer => sendAnswer(answer)} />}
            {state === states.EJECT && <Eject eject={eject} />}
            {state === states.DISCUSSION && <Discussion room={room} userID={socket.id} users={users} playing={playing} />}
        </section>
    )
}

export default App;