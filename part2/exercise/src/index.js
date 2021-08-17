import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => <h1>{props.course}</h1>;
const Part = ({part}) => <p>{part.name} {part.exercises}</p>;

const Content = ({parts}) =>
    <div>
        {parts.map(part => <Part part={part}/>)}
        <Total parts={parts}/>
    </div>

const Total = ({parts}) => <strong>total of {parts.map(p => p.exercises).reduce((a, b) => a + b)} exercises</strong>;

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];


    return (
        <div>
            {courses.map(course => <Course course={course}/>)}
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
