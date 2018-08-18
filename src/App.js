import React, { Component } from 'react'
import * as Data from './Data'
import Sidebar from "react-sidebar"
import Header from './components/Header'
import GoogleMap from './components/GoogleMapsContainer'
import Search from './components/Search'
import Footer from './components/Footer'
import './App.css'
class App extends Component {
    state = {
        sidebarOpen: false,
        restaurants: Data.getData()
    }

    // componentDidMount() {
    //     // Fetch restaurants' info from Foursuqare.
    //     const restaurants = []
    //     this.state.defaultResNames.forEach(name => {
    //         const query = this.convertStringToQuery(name)
    //         fetch(this.getRequestString(query)).then(res => {
    //             if (res.ok) {
    //                 return res.json()
    //             } else {
    //                 throw Error (res.statusText)
    //             }
    //         }).then(dt => restaurants.push(dt.response.venues[0])).then(this.setState({restaurants: restaurants}))
    //     })
    // }

    // getRequestString = (id) => `https://api.foursquare.com/v2/venues/${id}&client_id=LRYG3OLF2LZTRVK3JFNX22XED5SGGA1P32BIHPG5RYGXMLDO&client_secret=GKJMX3KNN1V5W3SLTB1QPVWQXCNG533GKAXJ1VK0ATWI5SIL&v=20180814`
    
    onSetSidebarOpen = (open) => {
        this.setState({ sidebarOpen: open })
    }

    // checkViewport = () => {
    //     const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches
    //     // if (window.matchMedia("only screen and (max-width: 760px)").matches){
    //     //     this.setState({isMobile: true})
    //     // } else {
    //     //     this.setState({isMobile: false})
    //     // }
    //     // console.log(isMobile)
    //     if(!isMobile){
    //         this.setState({isMobile})
    //         document.getElementById('main').style.cssText = `
    //             display: grid;
    //             grid-template-columns: repeat(3, 1fr);
    //             grid-auto-rows: minmax(100px, auto);`
    //         document.getElementById('search').style.cssText = `
    //             grid-column-start: 3;
    //             grid-column-end: 4;`
    //     } else {
    //         document.getElementById('main').style.cssText = ''
    //     }
    //     this.getMapDimensions();
    // }

        

    render() {
        const mapStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%'
        }

        return (
            <Sidebar
                sidebar={<Search restaurants={this.state.restaurants}/>}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
            >
                <Header onSetSidebarOpen={this.onSetSidebarOpen}/>
                <main id='main' style={mapStyle} >
                    <GoogleMap
                        mapHeight={this.state.mapHeight}
                        restaurants={this.state.restaurants}
                    />
                </main>
                <Footer />
            </Sidebar>
        )
    }
}

export default App;