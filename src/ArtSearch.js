import React, { Component } from 'react';
import axios from 'axios';
import App from './App';
import './App.css';


class ArtSearch extends Component {
    
    
    constructor() {
        super();
        this.state = {
            animalChoice: {},
            artArray: [],
            artResult: [],
            finalArtwork: {},
        }
    }
    
    componentDidMount() {
        let artResult;
        axios({
            url: 'https://collectionapi.metmuseum.org/public/collection/v1/search',
            method: 'GET',
            responseType: 'json',
            params: {
                q: this.props.userChoice,
                hasImages:true,
            }
        }).then( (artArray) => {
            artArray = artArray.data.objectIDs;
            artResult = artArray[Math.floor(Math.random() * artArray.length)];
            this.setState({
                artArray,
            })
            
//Then plug artResult into search for object, with accompanying image, info, etc
//https://collectionapi.metmuseum.org/public/collection/v1/objects/ then artResult I guess
            }).then( () => {

                // console.log()
                axios({
                    url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artResult}`,
                    method: 'GET',
                    responseType: 'json',
                    
                }).then( (objectDetails) => {
                    objectDetails = objectDetails.data;
                    this.setState({
                        objectDetails,
                })
                console.log("The second search happened")
            })
        }
        ) 
    };
    
    
    render() {
        // console.log(this.state.objectDetails && this.state.objectDetails.title)
        return (
            
            <div>
        <h1>{this.props.userChoice}</h1>
        <h2>{this.artResult}</h2>
        <h2>{this.state.objectDetails && this.state.objectDetails.title}</h2>
        
        {/* <p>{artResult}</p> */}
    </div>
            )
            
            
            
        };
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