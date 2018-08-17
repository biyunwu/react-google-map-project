import React, { Component } from 'react';

export default class Search extends Component {

    render() {
        const restaurants = this.props.restaurants
        // console.log(restaurants)
        
        return (
            <div id='sidebar' style={{width: 256, height: '100%'}} >
                <div id='sidebarcontent'>
                    <div className='title'><h1>Menu</h1></div>
                    <div id='search'>
                        <input/>
                        <span></span>
                        <button>Search</button>
                    </div>
                    <ul>
                        { restaurants && restaurants.map(restaurant => 
                            <li key={restaurant.id}>{restaurant.name}</li>
                        )}
                    </ul>
                    <img src='https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png' alt='restaurant icon'/>
                </div>
            </div>
        )
    }
}
