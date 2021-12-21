import React from "react";
import "./styles.css";

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
        element.defaultValue = element.incrementValue
          ? element.defaultValue + element.incrementValue
          : element.defaultValue + 1;
        return element;
      }
      return element;
    });
    this.setState({ counters });
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
      </div>
    );
  }
}

export default App;
