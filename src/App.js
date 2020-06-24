import React, { Component } from 'react';
// import ArtResult from './ArtResult';
import ArtSearch from './ArtSearch';
import axios from 'axios';
import './App.css';


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      isClick: false,
      animalChoice: '',
    }
  }
  
  handleClick = (event) => {
    this.setState({
      isClick: true,
      animalChoice: event.currentTarget.value,
    })
  }
  
  render() {
    return (
      <div className="mainPage">
      <h1>Animals @ The Met!</h1>
      <h2>Press a button below to see a piece of artwork from the Metropolitan Museum of Art featuring the corresponding animal!</h2>
      
      <div className="buttonAlignment">
        <button value="cats" onClick={this.handleClick}>Cat</button>
        <button value="dogs" onClick={this.handleClick}>Dog</button>
        <button value="pigs" onClick={this.handleClick}>Pig</button>
        <button value="dragons" onClick={this.handleClick}>Dragon</button>
      </div>
      
      {
        this.state.isClick ? <ArtSearch userChoice = {this.state.animalChoice}/> : null
      }

    </div>
    );
  }
}

export default App;

