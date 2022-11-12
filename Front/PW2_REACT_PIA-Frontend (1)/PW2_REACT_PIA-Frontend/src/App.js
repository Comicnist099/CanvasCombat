import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    renderedResponse: ''
  }

  getResponse = async() => {
    const response = await fetch('/users/63683020d83fd036d7091641');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  componentDidMount() {
    this.getResponse()
      .then(res => {
        const someData = res;
        this.setState({ renderedResponse: someData });
      })
  }

  render() {
    const { renderedResponse } = this.state;

    return (
      <div className="App">
        <h2>Call out to API!</h2>
        <p>{renderedResponse.nameUser}</p>
      </div>
    );
  }
}

export default App;