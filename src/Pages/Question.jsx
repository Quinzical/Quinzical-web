import React, { useState, useEffect, Fragment } from 'react';

import Button from '../Components/Button';

import './Home.css';
import Input from '../Components/Input';

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Question = ({ playing, timer, question, qualifier, submit, answer }) => {
    const [count, setCount] = useState(timer / 1000);
    const [userAnswer, setAnswer] = useState("")
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const counter = async () => {
            if (count > 0) {
                await timeout(1000);
                setCount(count - 1)
            }
        }
        counter()
    }, [count])

    return (
        <Fragment>
            <div className="menu__content">
                <p style={{ color: 'white', fontSize: 120, margin: 0 }}>{count}</p>
                <center>
                    <p style={{ color: 'white', fontSize: 50, margin: 0 }}>{qualifier}</p>
                    <p style={{ color: 'white', fontSize: 80, margin: 0 }}>{question}</p>
                </center>
                <div style={{ margin: 10, marginTop: 50, marginBottom: 50 }}>
                    {playing ? !submitted ?
                        <Input
                            className="menu__username"
                            placeholder="Answer"
                            pattern=".{1,}"
                            value={userAnswer}
                            style={{ margin: 'auto', left: -6, maxWidth: 400, backgroundColor: "black" }}
                            onChange={e => {
                                setAnswer(e.target.value)
                                if (e.keyCode == 13) {
                                    submit(userAnswer)
                                    setSubmitted(true)
                                }
                            }}
                        /> : <p style={{ color: 'white', fontSize: 40, margin: 0 }}>Waiting...</p>
                        : <p style={{ color: 'white', fontSize: 40, margin: 0 }}>Spectating</p>
                    }
                </div>
                <div className="menu__buttons">
                    <Button onClick={() => { if (!submitted) { submit(userAnswer); setSubmitted(true) } }}>Submit</Button>
                </div>
            </div>
        </Fragment>
    );
};

export default Question;
