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
        sidebarDocked: mql.matches,
        sidebarOpen: false,
        restaurants: Data.getData(),
        currMarkerId: null
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

    render() {
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
                    />
                }
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
            >
                <Header onSetSidebarOpen={this.onSetSidebarOpen}/>
                <main id='main' style={mapStyle} >
                    <GoogleMap
                        mapHeight={this.state.mapHeight}
                        restaurants={this.state.restaurants}
                        sidebarDocked={this.state.sidebarDocked}
                        setCurrMarkerId={this.setCurrMarkerId}
                    />
                </main>
                <Footer />
            </Sidebar>
        )
    }
}

export default App;