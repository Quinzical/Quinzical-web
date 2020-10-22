import React, { useState, useEffect, Fragment } from 'react';

import Button from '../Components/Button';

import './Home.css';
import Input from '../Components/Input';

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Question = ({ timer, question, submit }) => {
    const [count, setCount] = useState(timer / 1000);
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        const counter = async () => {
            if (count > 0){
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
                <p style={{ color: 'white', fontSize: 80, margin: 0 }}>{question}</p>
                <div style={{ margin: 10, marginTop: 50, marginBottom: 50 }}>
                    <Input
                        className="menu__username"
                        placeholder="Answer"
                        pattern=".{1,}"
                        value={answer}
                        style={{ margin: 'auto', left: -6, maxWidth: 400, backgroundColor: "black" }}
                        onChange={e => setAnswer(e.target.value)}
                    />
                </div>
                <div className="menu__buttons">
                    <Button onClick={() => submit(answer)}>Submit</Button>
                </div>
            </div>
        </Fragment>
    );
};

export default Question;
