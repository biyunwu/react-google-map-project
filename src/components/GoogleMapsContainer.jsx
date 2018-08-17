import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

class GoogleMapsContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        // mapDimension: {}
        // height: 0,
        // width: 0
    }


    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }
    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    // componentWillMount(){
    //     this.getMapDimensions();
    // }

    // componentDidMount(){
    //     // window.onresize = this.getMapDimensions
    //     this.setState({height: this.props.mapDimensions.height, width: this.props.mapDimensions.width})
    // }

    // getMapDimensions = () => {
    //     const w = Math.max(document.getElementById('header').clientWidth || 0);
    //     const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //     this.setState({mapDimension: {width: w, height: h}})
    //     console.log(w, h)
    // }
    // getElementHeight = (elementId) => Math.max(document.getElementById(elementId).clientHeight)

    render() {
        // const headerHeight = this.getElementHeight('header'), footerHeight = this.getElementHeight('footer')
        // // console.log(this.props.isMobile)
        // const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
        // const style = {
        //     width: isMobile ? '100%' : `${this.props.mapDimensions.width * 2 / 3}px`,
        //     height: isMobile? '50%' : `${this.props.mapDimensions.height - headerHeight - footerHeight}`
        // }
        // console.log(this.props.restaurants)
        const style = {
            width: '100%',
            height: `${this.props.mapHeight}px`
        }

        return (
            <Map
                item
                xs = { 12 }
                style = { style }
                google = { this.props.google }
                onClick = { this.onMapClick }
                zoom = { 13 }
                initialCenter = {{ lat: 40.7359, lng: -73.9911 }}
            >
                { this.props.restaurants.map(r => 
                    <Marker key={r.id}
                    onClick = { this.onMarkerClick }
                    title = { r.name }
                    address = {r.location.formattedAddress[0] + r.location.formattedAddress[1]}
                    position = {{ lat: r.location.lat, lng: r.location.lng }}
                    name = { r.name }
                    />
                )}
                
                <InfoWindow
                    marker = { this.state.activeMarker }
                    visible = { this.state.showingInfoWindow }
                >
                    <div>
                        <b>{this.state.selectedPlace.name}</b>
                        <h4>{this.state.selectedPlace.address}</h4>
                    </div>
                </InfoWindow>
                

                {/* <Marker
                    onClick = { this.onMarkerClick }
                    title = { 'The Dutch' }
                    position = {{ lat: 40.7265328, lng: -74.0043476 }}
                    name = { 'The Dutch' }
                />
                <InfoWindow
                    marker = { this.state.activeMarker }
                    visible = { this.state.showingInfoWindow }
                >
                    <div>
                        <b>{this.state.selectedPlace.name}</b>
                    </div>
                </InfoWindow>

                <Marker
                    onClick = { this.onMarkerClick }
                    title = { 'Spicy Village' }
                    position = {{ lat: 40.716974, lng: -73.995449 }}
                    name = { 'Spicy Village' }
                />
                <InfoWindow
                    marker = { this.state.activeMarker }
                    visible = { this.state.showingInfoWindow }
                >
                    <div>
                        <b>{this.state.selectedPlace.name}</b>
                    </div>
                </InfoWindow> */}

                
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDGmX9sBTOIe2vJ2vep_yFRJq5lNePrfUY'
})(GoogleMapsContainer)