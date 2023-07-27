//#region f(x)s for imgs, ternaries and &&
function makeLotr(e) {
  const p50 = Math.random() < 0.5;
  const url = (p50 ?
    "img/m.png" :
    "img/f.png"
  );
  e.target.setAttribute('src', url);
  // { p50 && algo } renderiza el algo sólo si p50 es verdadero
  const alt = (p50 ? "legolas" : "galadrieu");
  e.target.setAttribute('alt', alt);
}
const image = (
  <img
    src="img/react.png"
    alt="react"
    className="adjust-top-60p-viewport center-horizontally App-logo"
    onClick={makeLotr}
  />
);
//#endregion
ReactDOM.render(image, document.getElementById('exercise1'));

const friends = [{
  title: "Hey Guys! Wait Up!",
  src: "https://content.codecademy.com/courses/React/react_photo-earnestfrog.jpg"
}];
// New component class starts here:
class Friend extends React.Component {
  render() {
    let friend = friends[0];
    return (
      <div>
        <div>{friend.title}</div>
        <img alt={friends.title} src={friend.src} style={{ maxWidth: 33 + "vw" }} />
      </div>
    );
  }
}
ReactDOM.render(<Friend />, document.getElementById("exercise2"));

// vars & functions in render IN class
class Random extends React.Component {
  render() {
    const n = Math.floor(Math.random() * 10 + 1);
    return <div>The number is {n}!</div>;
  }
}
ReactDOM.render(<Random />, document.getElementById('exercise3'));

// Usage of getters and this within classes
class IceCreamGuy extends React.Component {
  get food() {
    return 'ice cream';
  }
  onHovering() {
    console.trace("trigger onHovering")
  }
  onMouseEnter() {
    document.getElementsByClassName("hover-div")[0].style.display = "inline";
  }
  onMouseLeave() {
    document.getElementsByClassName("hover-div")[0].style.display = "none";
  }
  render() {
    return <div className="h100"
      onMouseOver={this.onHovering}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
    >
      <div>I like {this.food} when you hover.</div>
      <div className="hover-div">Stop it! Stop hovering!</div>
    </div>;
  }
}
ReactDOM.render(<IceCreamGuy />, document.getElementById("exercise4"));

//#region JSX Map
const people = ['Uldaimonthir', 'Legolas', 'Galadrieu'];
const peopleList = people.map((person, i) => <li key={'person_' + i}>{person}</li>);
class PeopleUl extends React.Component {
  render() {
    return <ul>{peopleList}</ul>
  }
}
//#endregion
class PropsDisplayer extends React.Component {
  render() {
    const stringProps = JSON.stringify(this.props);
    return (
      <div>
        <div>Check out this props object</div>
        <div>{stringProps}</div>
        <div>Hello {this.props.firstName}</div>
        <PeopleUl />
      </div>
    );
  }
}
ReactDOM.render(
  <PropsDisplayer firstName="Pedro" />,
  document.getElementById('exercise5')
)