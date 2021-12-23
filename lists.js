import React from "react";
import "./styles.css";

const ListItems = (props) =>
  props.item.items.map((element) => <li>{element}</li>);

const Item = (props) => (
  <li onClick={() => props.handleToggle(props.item)}>
    {props.item.option}
    {props.item.showItems ? (
      <ul>
        <ListItems item={props.item} />
      </ul>
    ) : null}
  </li>
);

class List extends React.Component {
  handleToggle = (item) => {
    const newList = this.props.list.map((element) => {
      if (element === item) {
        item.showItems = !item.showItems;
      }
      return item;
    });
    this.setState({ newList });
  };

  render() {
    return (
      <ol>
        {this.props.list.map((item) => (
          <Item
            item={item}
            key={item.option}
            handleToggle={this.handleToggle}
          />
        ))}
      </ol>
    );
  }
}

class App extends React.Component {
  state = {
    list: [
      { option: "Option 1", items: ["wow", "cool", "sick"], showItems: false },
      { option: "Option 2", items: ["wow", "cool", "sick"], showItems: false },
      { option: "Option 3", items: ["wow", "cool", "sick"], showItems: false }
    ]
  };

  render() {
    return (
      <div className="App">
        <h1>Challenge 7</h1>
        <List list={this.state.list} />
      </div>
    );
  }
}

export default App;
