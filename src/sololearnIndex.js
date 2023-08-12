import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './my-app/src/reportWebVitals';

/** @typedef {{}} */
var ReactEvent;
/** @typedef {{}} */
var ReactObjectDefaultChildren;

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

/**
 * @param {ReactObjectDefaultChildren} props - to pass down information
 * from parent component to child component
 * @returns 
 */
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
/**
 * use `state` always when managing forms
 */
function setStateUsage() {
  const el = <Counter/>;
  ReactDOM.render(el, document.getElementById('root'));
}

class Person extends React.Component{state={name:this.props.name}}

/**
 * useState podría inicializarse en `""`.
 * @returns 
 */
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
  componentDidUpdate() {
    alert("Number of clicks: " + this.state.counter);
  }
  render() {
    return <div>
    <p>{this.state.counter}</p>
    <button onClick={this.increment}>Increment</button>
    </div>;
  }
}

/**
 * @returns alert every time counter changes (either mount, update, unmount)
 */
function Counter3() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    alert("Number of clicks: " + counter);
  });

  function increment() {
    setCounter(counter+1);
  }
  return <div>
  <p>{counter}</p>
  <button onClick={increment}>Increment</button>
  </div>;
}

function componentDidMountUsage() {
  ReactDOM.render(<Counter/>, document.getElementById('root'));
}

/**
 * @param {number} n 
 * @returns {number} `n` fixed to 2 decimal numbers.
 */
function redondear2Dec(n) {
  return parseFloat(n.toFixed(2));
}

function Converter() {
  const [km, setKm] = useState(0);

  /**
   * @param {ReactEvent} e 
   */
  function handleChange(e) {
    setKm(e.target.value);
  }
  function convert(km) {
    return (km/1.609).toFixed(2);
  }

  return <div>
  <input type="text" value={km}
     onChange={handleChange} />
  <p> {km} km is {convert(km)} miles </p>
  </div>;
}

/**
 * e.preventDefault() statement prevents the default behavior of the form.
 * Forms, by default, reloads the page when submitted.
 * In JavaScript we would use return false for that
 * In React we need to call preventDefault().
 * @param {ReactEvent} e
 */
function handleSubmitWithPreventDefault (e) {
  setSum(sum + Number(num));
  e.preventDefault();
}

/**
 * Its meant to share state for children,
 * 
 * so the state from a form already submitted
 * 
 * can be accesed for other child
 * @param {ReactObjectDefaultChildren} props 
 * @returns `<div/>`
 */
function ContactManager(props) {
  const [contacts, setContacts] = useState(props.data);

  function addPerson(name) {
    setContacts([...contacts, name]);
  }

  return (
    <div>
      <AddPersonForm handleSubmit={addPerson}/>
      <PeopleList data={contacts} />
    </div>
  );
}

function AddPersonForm(props) {
  const [ person, setPerson ] = useState("");
    
  function handleChange(e) {
    setPerson(e.target.value);
  }
  
  /**
   * Uses parent function `addPerson`
   * @param {ReactEvent} e 
   */
  function handleSubmit(e) {
    props.handleSubmit(person);
    setPerson('');
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" 
        placeholder="Add new contact" 
        onChange={handleChange} 
        value={person} />
      <button type="submit">Add</button>
    </form>
  );
}

function PeopleList(props) {
	const arr = props.data;
	const listItems = arr.map((val, index) => <li key={index}> {val}</li>);
	return <ul>{listItems}</ul>;
}

const contacts = ['James Smith', 'Thomas Anderson', 'Bruce Wayne'];
const peopleList = (
	<div>
		<AddPersonForm />
		<PeopleList data={contacts} />
	</div>
);

/**
  * If the parent component uses this to pass down its `calculate()` function:
  * 
  * ```js
  * <Child doStuff={calculate}/>
  * ```
  * 
  * The child call that function as `props.doStuff()`
  */
function howToPassFxToChildren() {}

reportWebVitals(console.log);
