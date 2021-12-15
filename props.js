import React from "react";
import "./styles.css";

const Fruit = (props) => (
  <li
    style={{ background: props.fruit.upperCase ? "cyan" : props.fruit.color }}
  >
    <span onClick={() => props.handleElement(props.fruit)}>
      {props.fruit.text}
    </span>
    <input onChange={(e) => props.handleChange(e, props.fruit)} />
  </li>
);

const Fruits = (props) => (
  <ul>
    {props.list.map((fruit) => (
      <Fruit
        key={fruit.text}
        handleElement={props.handleElement}
        fruit={fruit}
        handleChange={props.handleChange}
      />
    ))}
  </ul>
);

export default class App extends React.Component {
  state = {
    list: [
      { text: "apple", upperCase: false, color: "green" },
      { text: "lemon", upperCase: false, color: "yellow" },
      { text: "orange", upperCase: false, color: "orange" },
      { text: "cherry", upperCase: false, color: "red" }
    ]
  };

  handleElement = (element) => {
    // const newList = this.state.list.filter(fruit => {
    //   if (fruit !== element) {
    //     return fruit
    //   } return false;
    // });
    // this.setState({ list: newList });

    const newList = this.state.list.map((fruit) => {
      if (fruit.text === element.text) {
        fruit.upperCase = !fruit.upperCase;
        fruit.text =
          fruit.upperCase === true
            ? fruit.text.toUpperCase()
            : fruit.text.toLowerCase();
        return fruit;
      }
      return fruit;
    });
    this.setState({ list: newList });
  };

  handleChange = (e, element) => {
    console.log(e, element);
    const newList = this.state.list.map((fruit) => {
      if (element.text === fruit.text) {
        fruit.color = e.target.value;
      }
      return fruit;
    });
    this.setState({ list: newList });
  };

  render() {
    return (
      <div className="App">
        <h1>State/Props Practice</h1>
        <Fruits
          list={this.state.list}
          handleElement={this.handleElement}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}
