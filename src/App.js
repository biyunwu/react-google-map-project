import React, { Component } from 'react';
import Sidebar from "react-sidebar";
import GoogleMap from './components/GoogleMapsContainer'
import Search from './components/Search'
import './App.css'

const mql = window.matchMedia(`(min-width: 800px)`)
class App extends Component {
    state = {
        // isMobile: false,
        // mapDimensions: {}
        sidebarDocked: mql.matches,
        sidebarOpen: false
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged)
    }
    
    componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged)
    }
    
    onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open })
    }
    
    mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false })
    }

    // componentDidMount(){
    //     this.checkViewport()
    //     window.onresize = this.checkViewport
        
    //     // Google Palces API
    // }

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

    // getMapDimensions = () => {
    //     const w = Math.max(document.getElementById('header').clientWidth || 0);
    //     const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //     this.setState({mapDimensions: {width: w, height: h}})
    //     // console.log(w, h)
    // }


    render() {
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
            height: '94.5%'
        }

        return (
            <Sidebar
                sidebar={<Search />}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
                // styles={sidebarStyle}
            >
                <header id='header'>
                    <div className='title'>
                        <h1>Favourite Restaurants in NYC</h1>
                    </div>
                </header>
                {/* <GoogleMap /> */}
                <main id='main' style={mapStyle} >
                    <GoogleMap />
                    <Search />
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