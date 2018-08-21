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
        currSelectedListId: null
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
        this.setState({currSelectedListId: id})
    }

    handleInputChange = (query) => {
        const filteredRestaurants = []
        const term = query.replace(/[^\w\s]/gi, '').toLowerCase()
        const data = Data.getData()
        data.forEach(restaurant => {
            restaurant.name.toLowerCase().includes(term) && filteredRestaurants.push(restaurant)
        })
        this.setState({restaurants: filteredRestaurants})
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
                        setCurrMarkerId={this.setCurrMarkerId}
                        updateSelectedListId={this.updateSelectedListId}
                    />
                </main>
                <Footer />
            </Sidebar>
        )
    }
}

export default App;