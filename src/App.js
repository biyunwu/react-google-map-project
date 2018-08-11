import React, { Component } from 'react';
import GoogleMap from './components/GoogleMapsContainer'
import './App.css';

class App extends Component {
    state = {

    }

    componentDidMount(){
        // Google Palces API
    }

    render() {
        return (
            <div style={{ height:'100%', width:'100%' }}>
                <header>My Favourite Restaurants in NYC</header>
                <nav>
                
                </nav>
                <aside style={{ height:'100%', width:'100%' }}>
                    <GoogleMap />
                </aside>
            </div>
        )
    }
}

export default App;