import React, { Component, useState, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';

import Counter from './Counter';

const initialState = {TODOS: [], COMPLETED: []};

function reducer(state, action) {
  console.log(state.count);
  switch (action.type) {
    case 'ADD':
      // console.log(state.TODOS);
      state.TODOS.push(action.payload);
      return { TODOS: state.TODOS, COMPLETED: state.COMPLETED };
    case 'COMPLETE':
      const index = state.TODOS.indexOf(action.payload);
      if (index > -1) {
        state.TODOS.splice(index, 1);
      }
      state.COMPLETED.push(action.payload);
      return { TODOS: state.TODOS, COMPLETED: state.COMPLETED };
      case 'REMOVE':
      state.COMPLETED = [];
      return { TODOS: state.TODOS, COMPLETED: state.COMPLETED };
    default:
      return state;
  }
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState([]);

  return (
    <div className="App">
      <h1>TODO:</h1>
      {state.TODOS.map(TODO => (
        <h4>{TODO} <button onClick={() => dispatch({ type: 'COMPLETE', payload: TODO })}>Complete</button></h4>
      ))}
      <h1>COMPLETED:</h1>
      {state.COMPLETED.map(COMPLETE => (
        <h4>{COMPLETE}</h4>
      ))}
    <button onClick={() => dispatch({ type: 'REMOVE', payload: value })}>Remove Completed</button>
      <form onSubmit={(event) => {event.preventDefault(); dispatch({ type: 'ADD', payload: value }); }}>
        <input placeholder='Todo...' onChange={event => setValue(event.target.value)} />
        <button>Add</button>
      </form>
    </div>
  );

}

export default App;
