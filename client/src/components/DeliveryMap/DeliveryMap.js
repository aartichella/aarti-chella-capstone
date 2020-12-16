import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import addressList from '../../data/addressToLatLng.json'
import './DeliveryMap.scss';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
const mapStyles = {
    width: '100%',
    height: '100%',
  };

class DeliveryMap extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: this.props.data,
            storeLocation: {},
            userLocation: {}
        }
        console.log( this.state.orderInfo.storeAddress)
    }
    componentDidMount() {
        const address = this.state.orderInfo.storeAddress;
        const userAddress = this.state.orderInfo.userAddress;
        this.getGeocode(address,'storeLocation');
        this.getGeocode(userAddress, 'userLocation');
    }
    getGeocode = (address, stateParam) => {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=`+encodeURIComponent(address)
        url += `&key=${API_KEY}`
        axios.get(url)
            .then(results => {
                console.log(results);
                this.setState({
                    [stateParam]: results.data.results[0].geometry.location
                });
            });
    }
    displayMarker = (location) => (
        <Marker position={location}
          onClick={() => console.log("You clicked me!")} />
    )
    render(){
        return (!this.state.storeLocation) ? (<h2>Map Loading....</h2>) : 
         (  
            <Map
            google={this.props.google}
            zoom={13}
            style={mapStyles}
            initialCenter={{ lat: 43.653226, lng: -79.383184}}
            center={this.state.storeLocation}
            >
                {this.displayMarker(this.state.storeLocation)}
                {this.displayMarker(this.state.userLocation)}
            </Map>
          
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY
  })(DeliveryMap);