import React, { Component } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import TodoItems from "./Components/TodoItems";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };
  }

  inputHandler = (e) => {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: uuidv4(),
      },
    });
  };

  addItemHandler = (e) => {
    e.preventDefault();
    const currentItem = this.state.currentItem;
    if (currentItem.text !== "") {
      const newItems = [...this.state.items, currentItem];
      this.setState({
        items: newItems,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  };

  deleteItem = (key) => {
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({ items: filteredItems });
  };

  setUpdate = (text, key) => {
    console.log("items:" + this.state.items);
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        console.log(item.key + "    " + key);
        item.text = text;
      }
    });
    this.setState({ items: items });
  };

  render() {
    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItemHandler}>
            <input
              type="text"
              placeholder="Enter Text"
              value={this.state.currentItem.text}
              onChange={this.inputHandler}
            ></input>
            <button type="submit">Add</button>
          </form>
        </header>
        <TodoItems
          items={this.state.items}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        />
      </div>
    );
  }
}

export default App;
