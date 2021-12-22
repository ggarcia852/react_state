import React from "react";
import "./styles.css";

const Sort = (props) => (
  <button onClick={() => props.handleSort(props.list)}>Sort</button>
);

const Item = (props) => (
  <li
    data-testid="todo-item"
    className={props.item.completed ? "item-completed" : ""}
  >
    {props.item.value}
    <br />
    <button
      data-testid="toggle-button"
      onClick={() => props.handleToggle(props.item)}
    >
      Toggle
    </button>
    <button
      data-testid="delete-button"
      onClick={() => props.handleRemove(props.item)}
    >
      Remove
    </button>
    <br />
    Priority:{props.item.priority}
    <button onClick={() => props.handleDecrement(props.item)}>-</button>
    <button onClick={() => props.handleIncrement(props.item)}>+</button>
    <br />
    <br />
  </li>
);

const List = (props) => (
  <ol data-testid="todo-list">
    {props.list.map((item) => (
      <Item
        key={item.id}
        item={item}
        handleToggle={props.handleToggle}
        handleRemove={props.handleRemove}
        handleIncrement={props.handleIncrement}
        handleDecrement={props.handleDecrement}
      />
    ))}
  </ol>
);

class Form extends React.Component {
  state = {
    inputValue: ""
  };
  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const value = this.state.inputValue;

    this.setState({ inputValue: "" });
    this.props.handleSubmit(value);
  };
  handleSearch = (e) => {
    const value = e.target.value;
    this.props.handleSearch(value);
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            data-testid="add-todo"
            onChange={this.handleChange}
            value={this.state.inputValue}
          />
        </form>
        <input
          value={this.props.value}
          onChange={this.handleSearch}
          placeholder="Search"
        />
      </>
    );
  }
}

class App extends React.Component {
  state = {
    list: [],
    value: ""
  };

  handleSubmit = (value) => {
    const item = {
      value,
      completed: false,
      priority: 0,
      id: `${Math.random()}-${Math.random()}`
    };

    const newList = [...this.state.list, item];
    this.setState({ list: newList });
  };

  handleToggle = (item) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        element.completed = !element.completed;
      }
      return element;
    });
    this.setState({ list: newList });
  };

  handleRemove = (item) => {
    const newList = this.state.list.filter((element) => element.id !== item.id);
    this.setState({ list: newList });
  };

  handleSearch = (value) => {
    this.setState({ value });
  };

  handleIncrement = (item) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        return {
          ...element,
          priority: element.priority < 5 ? element.priority + 1 : 5
        };
      }
      return element;
    });
    this.setState({ list: newList });
  };

  handleDecrement = (item) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        return {
          ...element,
          priority: element.priority > 0 ? element.priority - 1 : 0
        };
      }
      return element;
    });
    this.setState({ list: newList });
  };

  handleSort = (list) => {
    const newList = list.sort(
      (first, second) => first.priority - second.priority
    );
    this.setState({ list: newList });
  };

  render() {
    const newList = this.state.list.filter((item) =>
      item.value.includes(this.state.value)
    );

    return (
      <div className="App">
        <h1>To-do App</h1>
        <Form
          handleSubmit={this.handleSubmit}
          handleSearch={this.handleSearch}
          value={this.state.value}
        />
        <List
          list={newList}
          handleToggle={this.handleToggle}
          handleRemove={this.handleRemove}
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
        />
        <Sort handleSort={this.handleSort} list={newList} />
      </div>
    );
  }
}

export default App;
