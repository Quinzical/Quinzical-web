import React, { useState, Fragment, useEffect } from 'react';

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Countdown = () => {
    const [count, setCount] = useState(3);

    useEffect(() => {
        const counter = async () => {
            while (count > 0) {
                await timeout(1000);
                setCount(count - 1)
            }
        }
        counter()
    }, [])

    return (
        <Fragment>
            <div className="page-404__message">
                <h1 className="page-404__error">{count}</h1>
            </div>
        </Fragment>
    );
};

export default Countdown;
