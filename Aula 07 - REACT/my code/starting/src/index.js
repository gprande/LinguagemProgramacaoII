import React from 'react'
import ReactDOM from 'react-dom'

// JSX: Javascript Extensions (XML)
const App = () => {
    return (
        <div>
            Hello World
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)