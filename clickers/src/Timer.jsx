import React, { useEffect, useReducer } from 'react';

function saveCurrentValue() {
    const savedCount = +localStorage.getItem('count');
    return savedCount ? savedCount : 0;
}

function reduser(state, { type }) {
    if (type === 'START') {
        return {
            ...state,
            isCounting: true
        }
    }
    if (type === 'STOP') {
        return {
            ...state,
            isCounting: false
        }
    }
    if (type === 'RESET') {
        return {
            count: 0,
            isCounting: true
        }
    }
    if (type === 'TICK') {
        return {
            count: state.count + 1,
            isCounting: true
        }
    }

    return state;
}

export default function Timer() {

    const [{ count, isCounting }, dispatch] = useReducer(reduser,
        {
            count: saveCurrentValue(),
            isCounting: false
        });

    useEffect(() => {
        localStorage.setItem('count', count);

    }, [count, dispatch])

    useEffect(() => {
        let timerId = null;
        if (isCounting) {
            timerId = setInterval(() => {
                dispatch({ type: 'TICK' })
            }, 1000);
        }

        return () => clearInterval(timerId);
    }, [isCounting, dispatch])


    return (
        <div className="App">
            <h1>React Timer</h1>
            <h3>{count}</h3>
            {!isCounting ? (
                <button onClick={() => dispatch({ type: 'START' })}>Start</button>
            ) : (
                <button onClick={() => dispatch({ type: 'STOP' })}>Stop</button>
            )}
            <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        </div>
    );

}