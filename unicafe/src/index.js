import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClick = (set, inc) => () => set(inc + 1)

    let all = good + neutral + bad;
    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleClick(setGood, good)} text='good' />
            <Button onClick={handleClick(setNeutral, neutral)} text='neutral' />
            <Button onClick={handleClick(setBad, bad)} text='bad' />
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {(good - bad) / all}</p>
            <p>positive {good/all * 100} %</p>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
