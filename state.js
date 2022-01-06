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
    {props.item.editItem ? (
      <form onSubmit={() => props.handleSubmit(props.item)}>
        <input
          defaultValue={props.item.value}
          onChange={props.handleChange}
          onBlur={() => props.handleBlur(props.item)}
        />
      </form>
    ) : (
      <span onClick={() => props.handleClick(props.item)}>
        {props.item.value}
      </span>
    )}
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

class List extends React.Component {
  state = {
    newValue: ""
  };

  handleClick = (item) => {
    this.props.list.map((element) => {
      if (element.id === item.id) {
        element.editItem = !element.editItem;
      }
      return element;
    });
    this.setState({ newValue: item.value });
  };

  handleChange = (e) => {
    this.setState({ newValue: e.target.value });
  };

  handleBlur = (item) => {
    const newValue = this.state.newValue;
    this.setState({ newValue: "" });
    this.props.handleEdit(item, newValue);
  };

  handleSubmit = (item) => {
    const newValue = this.state.newValue;
    this.setState({ newValue: "" });
    this.props.handleEdit(item, newValue);
  };

  render() {
    return (
      <ol data-testid="todo-list">
        {this.props.list.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleToggle={this.props.handleToggle}
            handleRemove={this.props.handleRemove}
            handleIncrement={this.props.handleIncrement}
            handleDecrement={this.props.handleDecrement}
            handleEdit={this.props.handleEdit}
            handleClick={this.handleClick}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleBlur={this.handleBlur}
          />
        ))}
      </ol>
    );
  }
}

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

  setInStorage = (list) => {
    window.localStorage.setItem("list", JSON.stringify(list));
  };

  handleSubmit = (value) => {
    const item = {
      value,
      completed: false,
      priority: 0,
      editItem: false,
      id: `${Math.random()}-${Math.random()}`
    };

    const newList = [...this.state.list, item];
    this.setState({ list: newList });
    this.setInStorage(newList);
  };

  handleToggle = (item) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        element.completed = !element.completed;
      }
      return element;
    });
    this.setState({ list: newList });
    this.setInStorage(newList);
  };

  handleRemove = (item) => {
    const newList = this.state.list.filter((element) => element.id !== item.id);
    this.setState({ list: newList });
    this.setInStorage(newList);
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
    this.setInStorage(newList);
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
    this.setInStorage(newList);
  };

  handleSort = (list) => {
    const newList = list.sort(
      (first, second) => first.priority - second.priority
    );
    this.setState({ list: newList });
    this.setInStorage(newList);
  };

  handleEdit = (item, value) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        return {
          ...element,
          value,
          editItem: !element.editItem
        };
      }
      return element;
    });
    this.setState({ list: newList });
    this.setInStorage(newList);
  };

  componentDidMount() {
    this.setState({
      list: JSON.parse(window.localStorage.getItem("list")) || []
    });
  }

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
          handleEdit={this.handleEdit}
        />
        <Sort handleSort={this.handleSort} list={newList} />
      </div>
    );
  }
}

export default App;
