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
      .then((artArray) => {
        artArray = artArray.data.objectIDs;
        artResult = artArray[Math.floor(Math.random() * artArray.length)];
        this.setState({
          artArray,
        });
      })
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

  componentDidUpdate(prevProps) {
    if (this.props.userChoice !== prevProps.userChoice) {
      this.getApiData();
    }
  }

  render() {
    return (
      <div className="artworkDisplay">
        <h2>{this.artResult}</h2>
        <h2>{this.state.objectDetails && this.state.objectDetails.title}</h2>
        <img src={this.state.objectDetails && this.state.objectDetails.primaryImage}></img>
        {/* <a href='https://pngtree.com/so/decorative-border'>decorative-border png from pngtree.com</a> */}
      </div>
    );
  }
}
// <img src={this.state.artResult.primaryImage}></img>
// <img src={this.state.finalArtwork.primaryImage} alt={this.state.finalArtwork.title}></img>
export default ArtSearch;
// console.log(objectDetails)
// }).then( (response) => {
//     console.log(response);
//     this.setState({
//         finalArtwork: response.data
//     })
    // console.log(objectDetails)
    // <img src={this.state.finalArtwork.primaryImage} alt={this.state.finalArtwork.title}></img>
    // <img src={this.state.artResult.primaryImage}></img>
// }).then( (response) => {
//     console.log(response);
//     this.setState({
//         finalArtwork: response.data
//     })