import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistics = ({bad, good, neutral}) => {
    const all = good + neutral + bad

    if (all === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    const average = (good - bad) / all;
    const positiveRatio = good / all * 100;

    return <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positiveRatio} %</p>
    </>;
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClick = (set, inc) => () => set(inc + 1)

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleClick(setGood, good)} text='good'/>
            <Button onClick={handleClick(setNeutral, neutral)} text='neutral'/>
            <Button onClick={handleClick(setBad, bad)} text='bad'/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)
