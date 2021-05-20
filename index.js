import React, { useState } from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './my-app/src/reportWebVitals';

//#region
/**
 * Carga predeterminada de App.js
 */
function defaultLoad() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

function renderUsage() {
  ReactDOM.render(
    <h1>Hello, React!</h1>,
    document.getElementById('root')
  );
}

function displayGrowingNumber() {
  let counter = 0;
  function show() {
    counter++;
    const el = <p>{counter}</p>;
    ReactDOM.render(
      el, document.getElementById('root')
    );
  }
  setInterval(show, 1000);
}

function Hello(props){return <p>Hello, {props.name}!</p>;}
class Hello1 extends React.Component{render(){return <p>Hello, {this.props.name}!</p>;}}
class Hello2 extends React.Component{
  state={name:"James"};render(){return <h1>Hello {this.state.name}.</h1>;}
}
function fHello2() {
  const el = <Hello2 name="David" />;
  ReactDOM.render(el, document.getElementById('root'));
}

class Counter1 extends React.Component {
  state = {
    counter: 0
  }
  increment = () => {
    this.setState({
     counter: this.state.counter+1});
  }
  render() {
    return <div>
    <p>{this.state.counter}</p>
    <button onClick={this.increment}>Increment</button>
    </div>;
  }
}
function setStateUsage() {
  const el = <Counter/>;
  ReactDOM.render(el, document.getElementById('root'));
}

class Person extends React.Component{state={name:this.props.name}}

function Hello3() {
  const [name, setName] = useState("David");
  const [count, setCount] = useState(42);
  return <h1>Hello {name}.</h1>;
}
function useStateUsageInFunctions() {
  ReactDOM.render(<Hello3/>, document.getElementById('root'));
}

function fCounter() {
  const [counter, setCounter] = useState(0);

  function increment() { setCounter(counter+1); }

  return <div>
    <p>{counter}</p>
    <button onClick={increment}>
      Increment
    </button>
  </div>;
}
function useStateAndSetterUsage() {
  ReactDOM.render(<fCounter/>, document.getElementById('root'));
}

class Counter2 extends React.Component {
  state = { counter: 0 }
  increment = () => {
    this.setState({counter: this.state.counter+1});
  }
  componentDidMount() { this.setState({counter: 42}); }
  // Similarly, the componentWillUnmount() lifecycle method
  // is called right before the component is removed from the DOM.
  // It can be used to free up resources taken by the component.
  render() {
    return <div>
    <p>{this.state.counter}</p>
    <button onClick={this.increment}>Increment</button>
    </div>;
  }
}
function componentDidMountUsage() {
  ReactDOM.render(<Counter/>, document.getElementById('root'));
}

reportWebVitals(console.log);
