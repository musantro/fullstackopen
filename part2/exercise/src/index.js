import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => <h1>{props.course}</h1>;
const Part = ({part}) => <p>{part.name} {part.exercises}</p>;

const Content = ({parts}) =>
    <>
        {parts.map(part => <Part part={part}/>)}
    </>

const Total = ({parts}) => <p>Number of exercises {parts.map(p => p.exercises).reduce((a, b) => a+b)}</p>;

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return <Course course={course} />
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))