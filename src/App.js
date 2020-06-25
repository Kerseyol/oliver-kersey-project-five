import React, { Component } from 'react';
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
  
  //on a button click, the choice's value is stored in the state.
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
      <h3>Press a button below to see a piece of artwork from the Metropolitan Museum of Art featuring the corresponding animal!</h3>
      
      <section className="finalArrangement">

        <div className="buttonAlignment">
          <button value="horses" onClick={this.handleClick}><a href="#">Horses</a></button>
          <button value="tags:dog" onClick={this.handleClick}><a href="#">Dogs</a></button>
          <button value="birds" onClick={this.handleClick}><a href="#">Birds</a></button>
          <button value="tags:dragon" onClick={this.handleClick}><a href="#">Dragons</a></button>
          <button value="tags:animals" onClick={this.handleClick}><a href="#">Random</a></button>
        </div>

{/* The click event and choice is handled through a ternary expression and passed on to the ArtSearch module */}
{/* The module is designated to return its output here in the page */}
            {
              this.state.isClick ? <ArtSearch userChoice = {this.state.animalChoice}/> : null
            }

      </section>

    </div>
    );
  }
}

export default App;

