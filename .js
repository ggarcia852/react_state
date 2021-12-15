import React from "react";
import "./styles.css";

const Item = (props) => <li className={props.item.completed ? 'item-completed' : ''}>{props.item.value}<button onClick={(e) => props.handleToggle(props.item)}>Toggle</button></li>;

const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item} item={item} handleToggle={props.handleToggle} />
    ))}
  </ul>
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
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.inputValue} />
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    list: []
  };

  handleSubmit = (value) => {
    const item = {
      value, 
      completed: false,
      id: `${Math.random()}-${Math.random()}`
    }
    const newList = [...this.state.list, item];
    this.setState({ list: newList });
  };

  handleToggle = (item) => {
    const newList = this.state.list.map(element => {
      if(element.id === item.id){
        element.completed = !element.completed;
      }
      return element;
    });
    this.setState({list: newList})
  }

  render() {
    return (
      <div className="App">
        <Form handleSubmit={this.handleSubmit} />
        <List list={this.state.list} handleToggle={this.handleToggle} />
      </div>
    );
  }
}

export default App;

// Class Components

// const Button = (props) => (
//   <button onClick={(e) => props.handleClick(props.text)} >
//     {props.text}
//   </button>
// );

// class Increment extends React.Component {
//   state = {
//     increment: 0
//   }

//   handleClick = () => {
//    this.setState({ increment: this.state.increment + this.props.incrementValue })
//   }

//   render(){
//     return(
//        <Button handleClick={this.handleClick} text={this.state.increment} />
//     );
//   }
// }

// class Popup extends React.Component {
//   state = {
//     showPopup: false
//   }

//   handleClick = () => {
//    this.setState({ showPopup: !this.state.showPopup })
//   }

//   render(){
//     return(
//       <div>
//        <Button handleClick={this.handleClick} text={'show popup'} />
//        {this.state.showPopup && <div>popup</div>}
//       </div>
//     );
//   }
// }

// class App extends React.Component {

//   render(){
//     return(
//       <div className="App">
//       <Popup />
//       <Increment incrementValue={5} />
//       <Increment incrementValue={-10} />
//       </div>
//     )
//   }
// }

// export default App;

//Function Component

// export default function App() {
//   const handleClick = (string) => {
//     console.log(string);
//   };

//   const handleChange = (e) => {
//     console.log(e.target.value);
//   };

//   return (
//     <div className="App">
//       <Button handleClick={handleClick} text='letters' />
//       <Button handleClick={handleClick} text='numbers' />
//       <input onChange={handleChange} />
//      </div>
//   );
// }
