import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import { unwatchFile } from 'fs';

class GoogleMapsContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        mapHeight: 0,
        currVenue: null
    }

    componentDidMount(){
        this.getMapDimensions()
        // Make the Google map responsive.
        window.addEventListener('resize', this.getMapDimensions)
    }

    getMapDimensions = () => {
        const headerHeight = Math.max(document.getElementById('header').clientHeight || 0)
        const footerHeight = Math.max(document.getElementById('footer').clientHeight || 0)
        const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        this.setState({mapHeight: viewportHeight-headerHeight-footerHeight})
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
        console.log('props, props.id', props, props.id)
        fetch(this.getRequestString(props.id))
            .then(this.checkResponse)
            .then(dt => this.setState({currVenue: dt && dt.response? dt.response.venue : null}))
    }

    checkResponse = (res) => {
        if (res.ok) {
            return res.json()
        } else {
            // alert('No response from server!')
            document.getElementById('footertext').innerText = 'Only basic info is available due to the daily request limitation of Foursqaure API.'
            document.getElementById('footer').style.backgroundColor = 'red'
        }
    }

    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    getRequestString = (id) => `https://api.foursquare.com/v2/venues/${id}?&client_id=LRYG3OLF2LZTRVK3JFNX22XED5SGGA1P32BIHPG5RYGXMLDO&client_secret=GKJMX3KNN1V5W3SLTB1QPVWQXCNG533GKAXJ1VK0ATWI5SIL&v=20180323&limit=1`

    render() {
        const currVenue = this.state.currVenue
        const selectedPlace = this.state.selectedPlace
        const venueInfo = {}
        if (currVenue && selectedPlace && selectedPlace.id === currVenue.id) {
            venueInfo.url = currVenue.url ? currVenue.url : 0
            venueInfo.price = currVenue.attributes.groups[0].summary.includes('$')
                                ? currVenue.attributes.groups[0].summary : 0
            venueInfo.rating = currVenue.rating? currVenue.rating : 0
            venueInfo.phone = currVenue.contact.formattedPhone || 0
            venueInfo.category = currVenue.categories[0].shortName || 0
            venueInfo.delivery = currVenue.delivery && currVenue.delivery.url
                                    ? currVenue.delivery.url
                                    : 0
        }
        console.log('currInfo', venueInfo);

        const style = {
            width: '100%',
            height: `${this.state.mapHeight}px`
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
                    <Marker 
                    key={r.id}
                    id={r.id}
                    onClick = { this.onMarkerClick }
                    title = { r.name }
                    address = {r.location.formattedAddress.join(', ')}
                    position = {{ lat: r.location.lat, lng: r.location.lng }}
                    name = { r.name }
                    />
                )}
                
                <InfoWindow
                    marker = { this.state.activeMarker }
                    visible = { this.state.showingInfoWindow }
                >
                    <div>
                        <p>
                            <b><a href={venueInfo.url}>{this.state.selectedPlace.name}</a></b>
                            <span class='dollarsign'>{venueInfo.price}</span>
                        </p>
                        <p>{this.state.selectedPlace.address}</p>
                        {venueInfo.category && <p>Style: {venueInfo.category}</p>}
                        {venueInfo.delivery && <p><a href={venueInfo.delivery}>Delivery Available</a></p>}
                        <p>{venueInfo.phone && {Contact: venueInfo.phone}}</p>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDGmX9sBTOIe2vJ2vep_yFRJq5lNePrfUY'
})(GoogleMapsContainer)