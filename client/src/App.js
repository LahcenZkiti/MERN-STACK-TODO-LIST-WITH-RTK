import React from 'react';
import './style.scss';
import Input from './components/Input';
import ListTodos from './components/ListTodos';

function App() {

  return (
    <div className="App">
      <Input/>
      <ListTodos/>
    </div>
  );
}

export default App;
