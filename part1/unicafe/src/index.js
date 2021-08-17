import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

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
    const positive = good / all * 100;

    return <table>
        <tbody>
            <Statistic text='good' value={good}/>
            <Statistic text='neutral' value={neutral}/>
            <Statistic text='bad' value={bad}/>
            <Statistic text='all' value={all}/>
            <Statistic text='average' value={average}/>
            <Statistic text='positive' value={positive}/>
        </tbody>
    </table>;
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
