import React, { Component } from 'react'
import * as Data from './Data'
import Sidebar from "react-sidebar"
import Header from './components/Header'
import GoogleMap from './components/GoogleMapsContainer'
import Search from './components/Search'
import Footer from './components/Footer'
import './App.css'

const mql = window.matchMedia(`(min-width: 800px)`)

class App extends Component {
    state = {
        sidebarDocked: mql.matches, // Listen on window size.
        sidebarOpen: false,
        restaurants: Data.getData(), // Get restaurants' basic info
        currMarkerId: null,
        currSelectedListId: null,
        // showSimpleInfoWindow: true
        currBasicMarkerData: null
    }

    componentDidMount() {
        this.checkInternetConnection();
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged = () => {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    setCurrMarkerId = (id) => {
        this.setState({currMarkerId: id})
    }
    
    onSetSidebarOpen = (open) => {
        this.setState({ sidebarOpen: open })
    }

    updateSelectedListId = (id) => {
        const currBasicMarkerData = this.state.restaurants.find(r => r.id === id)
        // this.setState({currSelectedListId: id, showSimpleInfoWindow: true})
        this.setState({currSelectedListId: id, currBasicMarkerData: currBasicMarkerData})
    }

    // closeSimpleInfoWindow = () => {
    //     this.setState({showSimpleInfoWindow: false})
    // }

    handleInputChange = (query) => {
        const filteredRestaurants = []
        const term = query.replace(/[^\w\s]/gi, '').toLowerCase()
        const data = Data.getData()
        data.forEach(restaurant => {
            restaurant.name.toLowerCase().includes(term) && filteredRestaurants.push(restaurant)
        })
        this.setState({restaurants: filteredRestaurants})
    }

    checkInternetConnection = () => {
        if (!navigator.onLine) {
            document.getElementById('footer').style.backgroundColor = 'red'
            document.getElementById('footertext').innerText = 'Internet connection failed!'
        }
    }

    render() {
        // console.log(this.state.currSelectedListId)
        const mapStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%'
        }

        return (
            <Sidebar
                sidebar={
                    <Search
                        restaurants={this.state.restaurants}
                        currMarkerId={this.state.currMarkerId}
                        updateSelectedListId={this.updateSelectedListId}
                        setCurrMarkerId={this.setCurrMarkerId}
                        handleInputChange={this.handleInputChange}
                    />
                }
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
            >
                <Header 
                    onSetSidebarOpen={this.onSetSidebarOpen}
                    sidebarDocked={this.state.sidebarDocked}
                />
                <main id='main' style={mapStyle} >
                    <GoogleMap
                        sidebarDocked={this.state.sidebarDocked}
                        restaurants={this.state.restaurants}
                        currSelectedListId={this.state.currSelectedListId}
                        currBasicMarkerData={this.state.currBasicMarkerData}
                        // showSimpleInfoWindow={this.state.showSimpleInfoWindow}
                        setCurrMarkerId={this.setCurrMarkerId}
                        updateSelectedListId={this.updateSelectedListId}
                        // closeSimpleInfoWindow={this.closeSimpleInfoWindow}
                        checkInternetConnection={this.checkInternetConnection}
                    />
                </main>
                <Footer />
            </Sidebar>
        )
    }
}

export default App;