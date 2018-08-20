import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
// import { unwatchFile } from 'fs';

class GoogleMapsContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        mapWidth: 0,
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
        if (this.props.sidebarDocked) {
            const sidebarWidth = Math.max(document.getElementById('sidebar').clientWidth || 0)
            const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
            this.setState({mapWidth: viewportWidth-sidebarWidth, mapHeight: viewportHeight-headerHeight-footerHeight})
        }
        this.setState({mapHeight: viewportHeight-headerHeight-footerHeight})
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
        // Transfer clicked marker's id to the parent component
        this.props.setCurrMarkerId(props.id)
        fetch(this.getRequestString(props.id))
            .then(this.checkResponse)
            .then(dt => dt && dt.response && dt.response.venue ? dt.response.venue : null)
            .then(venue => this.setState({currVenue: venue}))
    }

    checkResponse = (res) => {
        if (res.ok) {
            if(document.getElementById('footer').style.backgroundColor === 'red'){
                document.getElementById('footertext').innerHTML = `<p id='footertext'>Developed with appetite by <a href='https://biyunwu.com'>Biyun Wu</a>.</p>`
                document.getElementById('footer').style.backgroundColor = 'gold'
            }
            return res.json()
        } else {
            document.getElementById('footertext').innerText = 'Only basic info is available due to the daily request limitation of Foursqaure API.'
            document.getElementById('footer').style.backgroundColor = 'red'
            return 0
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

    getRequestString = (id) => `https://api.foursquare.com/v2/venues/${id}?&client_id=LRYG3OLF2LZTRVK3JFNX22XED5SGGA1P32BIHPG5RYGXMLDO&client_secret=GKJMX3KNN1V5W3SLTB1QPVWQXCNG533GKAXJ1VK0ATWI5SIL&v=20180817&limit=1`

    render() {
        const currVenue = this.state.currVenue
        const selectedPlace = this.state.selectedPlace
        const venueInfo = {}
        if (currVenue && selectedPlace && selectedPlace.id === currVenue.id) {
            venueInfo.url = currVenue.url ? currVenue.url : undefined
            venueInfo.price = currVenue.attributes.groups[0].summary.includes('$')
                                ? currVenue.attributes.groups[0].summary : undefined
            venueInfo.rating = currVenue.rating? currVenue.rating : undefined
            venueInfo.phone = currVenue.contact.formattedPhone || undefined
            venueInfo.category = currVenue.categories[0].shortName || undefined
            venueInfo.delivery = currVenue.delivery && currVenue.delivery.url
                                    ? currVenue.delivery.url
                                    : undefined
        }

        const mapStyle = {
            width: this.props.sidebarDocked ? `${this.state.mapWidth}px` : '100%',
            height: `${this.state.mapHeight}px`
        }

        return (
            <Map
                style = { mapStyle }
                google = { this.props.google }
                onClick = { this.onMapClick }
                zoom = { 13 }
                initialCenter = {{ lat: 40.7359, lng: -73.9951 }}
            >
                { this.props.restaurants.map(r =>
                    <Marker 
                    key={ r.id }
                    id={ r.id }
                    // If the marker's corresponding list is clicked, then show the animation.
                    animation={this.props.currSelectedListId === r.id ? this.props.google.maps.Animation.DROP : undefined}
                    onClick = { this.onMarkerClick }
                    title = { r.name }
                    address = { r.location.formattedAddress[0] }
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
                            <span className='dollarsign'>{venueInfo.price}</span>
                        </p>
                        {venueInfo.category && <p>Style: {venueInfo.category}</p>}
                        {venueInfo.rating && <p>Rating: {venueInfo.rating}</p>}
                        {venueInfo.delivery && <p><a href={venueInfo.delivery}>Delivery Available</a></p>}
                        {venueInfo.phone && <p>{venueInfo.phone}</p>}
                        <p>{this.state.selectedPlace.address}</p>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDGmX9sBTOIe2vJ2vep_yFRJq5lNePrfUY'
})(GoogleMapsContainer)