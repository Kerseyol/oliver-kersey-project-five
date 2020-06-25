import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
class ArtSearch extends Component {
  constructor() {
    super();
    this.state = {
      animalChoice: {},
      artArray: [],
      artResult: [],
      finalArtwork: {},
      objectDetails: [],
    };
  }

//   A variable is created to contain the user's selection from the App.js
// The MET's Search endpoint is called with the user's selection query inserted 
  getApiData = () => {
    let artResult;
    axios({
      url: 'https://collectionapi.metmuseum.org/public/collection/v1/search',
      method: 'GET',
      responseType: 'json',
      params: {
        q: this.props.userChoice,
        hasImages: true,
      },
    })
    // The resulting array of Object IDs is mapped and fed through a randomizing function to produce a single ID's return
      .then((artArray) => {
        artArray = artArray.data.objectIDs;
        artResult = artArray[Math.floor(Math.random() * artArray.length)];
        this.setState({
          artArray,
        });
      })
    //   The Object ID is then added to the end of the Objects endpoint from the MET's API
    //  in order to obtain the full object data for the individual art piece
      .then(() => {
        axios({
          url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artResult}`,
          method: 'GET',
          responseType: 'json',
        }).then((objectDetails) => {
          objectDetails = objectDetails.data;
          this.setState({
            objectDetails,
          });
        });
      });
    };

  componentDidMount() {
    this.getApiData();
  }
//   The current choice of search query is compared to the previous selection, if different the
// search goes through 
  componentDidUpdate(prevProps) {
    if (this.props.userChoice !== prevProps.userChoice) {
      this.getApiData();
    }
  }
  //    A variety of object data from the randomized art piece selection can then be populated into the main page
  render() {
    return (
      <div className="artworkDisplay">
        <h2>{this.artResult}</h2>
        <h2>Title: "{this.state.objectDetails && this.state.objectDetails.title}", Artist: "{this.state.objectDetails && this.state.objectDetails.artistDisplayName}"</h2>
        <img src={this.state.objectDetails && this.state.objectDetails.primaryImage} alt={this.state.objectDetails && this.state.objectDetails.title}></img>
      </div>
    );
}
}

export default ArtSearch;
