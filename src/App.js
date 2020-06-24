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
        <button value="tags:horse" onClick={this.handleClick}>Horses</button>
        <button value="tags:dog" onClick={this.handleClick}>Dogs</button>
        <button value="tags:bird" onClick={this.handleClick}>Birds</button>
        <button value="tags:terms:dragon" onClick={this.handleClick}>Dragons</button>
      </div>
      
      {
        this.state.isClick ? <ArtSearch userChoice = {this.state.animalChoice}/> : null
      }

    </div>
    );
  }
}

export default App;

