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
            this.artResult = artArray[Math.floor(Math.random() * artArray.length)];
            this.setState({
                artArray,
            })
            console.log("The first search happened")
            console.log(this.artResult)
            console.log(`Now we've just got to get ${this.artResult} into the search URL`)
            
//Then plug artResult into search for object, with accompanying image, info, etc
//https://collectionapi.metmuseum.org/public/collection/v1/objects/ then artResult I guess
            }).then(
            axios({
                url: 'https://collectionapi.metmuseum.org/public/collection/v1/objects',
                method: 'GET',
                responseType: 'json',
                
            }).then( (objectDetails) => {
                objectDetails = objectDetails.data;
                this.setState({
                    objectDetails,
                })
                console.log("The second search happened")
                // console.log(objectDetails)
            }).then( (response) => {
                console.log(response);
                this.setState({
                    finalArtwork: response.data
                })
            })
        ) 
    };
    
    
    render() {
        
        return (
            
            <div>
        <h1>{this.props.userChoice}</h1>
        
        {/* <p>{artResult}</p> */}
    </div>
            )
            
            
            
        };
    }
    
    // <img src={this.state.artResult.primaryImage}></img>
        
    // <img src={this.state.finalArtwork.primaryImage} alt={this.state.finalArtwork.title}></img>
    
export default ArtSearch;