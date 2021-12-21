import React from "react";
import "./styles.css";

const Button = (props) => (
  <button onClick={() => props.sort(props.counters)}>Sort</button>
);

class Counter extends React.Component {
  render() {
    return (
      <div>
        {this.props.defaultValue}
        <button onClick={() => this.props.handleClick(this.props.counter)}>
          {this.props.name}
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    counters: [
      {
        name: "+5",
        defaultValue: 5,
        incrementValue: 5,
        id: `${Math.random()}-${Math.random()}`
      },
      {
        name: "+27",
        defaultValue: 15,
        incrementValue: 27,
        id: `${Math.random()}-${Math.random()}`
      },
      {
        name: "+3",
        defaultValue: 25,
        incrementValue: 3,
        id: `${Math.random()}-${Math.random()}`
      },
      { name: "+1", defaultValue: 35, id: `${Math.random()}-${Math.random()}` }
    ]
  };

  handleClick = (counter) => {
    const counters = this.state.counters.map((element) => {
      if (element.id === counter.id) {
        return {
          ...element,
          defaultValue: element.defaultValue + (element.incrementValue || 1)
        };
      }
      return element;
    });
    this.setState({ counters });
  };

  handleSort = (counters) => {
    const sorted = counters.sort(
      (first, second) => first.defaultValue - second.defaultValue
    );
    this.setState({ sorted });
  };

  render() {
    return (
      <div className="App">
        <h1>Counter App</h1>
        {this.state.counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            handleClick={this.handleClick}
            name={counter.name}
            defaultValue={counter.defaultValue}
          />
        ))}
        <Button sort={this.handleSort} counters={this.state.counters} />
      </div>
    );
  }
}

export default App;
