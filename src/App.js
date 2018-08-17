import React, { Component } from 'react'
import * as Data from './Data'
import Sidebar from "react-sidebar"
import Header from './components/Header'
import GoogleMap from './components/GoogleMapsContainer'
import Search from './components/Search'
import './App.css'
class App extends Component {
    state = {
        sidebarOpen: false,
        mapHeight: 500,
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

    convertStringToQuery = (str) => encodeURIComponent(str.trim())

    getRequestString = (str) => `https://api.foursquare.com/v2/venues/search?near=Manhattan,NY&categoryId=4d4b7105d754a06374d81259&query=${str}&client_id=LRYG3OLF2LZTRVK3JFNX22XED5SGGA1P32BIHPG5RYGXMLDO&client_secret=GKJMX3KNN1V5W3SLTB1QPVWQXCNG533GKAXJ1VK0ATWI5SIL&v=20180814`
    
    onSetSidebarOpen = (open) => {
        this.setState({ sidebarOpen: open })
    }

    componentDidMount(){
        // this.checkViewport()
        // window.onresize = this.checkViewport
        this.getMapDimensions()
        window.addEventListener('resize', this.getMapDimensions())
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

    getMapDimensions = () => {
        const headerHeight = Math.max(document.getElementById('header').clientHeight || 0);
        const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.setState({mapHeight: viewportHeight-headerHeight})
        console.log(headerHeight, viewportHeight)
    }
        

    render() {
        // console.log(this.state.mapHeight);
        // const sidebarStyle = {
        //     root: {
        //         position: "absolute",
        //         top: 0,
        //         left: 0,
        //         right: 0,
        //         bottom: 0,
        //         overflow: "hidden"
        //     },
        //     sidebar: {
        //         zIndex: 2,
        //         position: "absolute",
        //         top: 0,
        //         bottom: 0,
        //         transition: "transform .3s ease-out",
        //         WebkitTransition: "-webkit-transform .3s ease-out",
        //         willChange: "transform",
        //         overflowY: "auto"
        //     },
        //     content: {
        //         position: "absolute",
        //         top: 0,
        //         left: 0,
        //         right: 0,
        //         bottom: 0,
        //         overflowY: "auto",
        //         WebkitOverflowScrolling: "touch",
        //         transition: "left .3s ease-out, right .3s ease-out"
        //     },
        //     overlay: {
        //         zIndex: 1,
        //         position: "fixed",
        //         top: 0,
        //         left: 0,
        //         right: 0,
        //         bottom: 0,
        //         opacity: 0,
        //         visibility: "hidden",
        //         transition: "opacity .3s ease-out, visibility .3s ease-out",
        //         backgroundColor: "rgba(0,0,0,.3)"
        //     },
        //     dragHandle: {
        //         zIndex: 1,
        //         position: "fixed",
        //         top: 0,
        //         bottom: 0
        //     }
        // }

        const mapStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%'
        }

        return (
            <Sidebar
                sidebar={<Search restaurants={this.state.restaurants}/>}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
                // styles={sidebarStyle}
            >
                <Header onSetSidebarOpen={this.onSetSidebarOpen}/>
                <main id='main' style={mapStyle} >
                    <GoogleMap
                        mapHeight={this.state.mapHeight}
                        restaurants={this.state.restaurants}
                    />
                </main>
            </Sidebar>


            // <div id='mainContainer' style={style} >
            //     <header id='header'><h1>My Favourite Restaurants in NYC</h1></header>
            //     <main id='main' style={style} >
            //         <GoogleMap />
            //         <Search />
            //     </main>
            //     <footer id='footer'><p>Developed by Biyun Wu</p></footer>
            // </div>
        )
    }
}

export default App;