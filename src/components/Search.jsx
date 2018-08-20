import React, { Component } from 'react';

export default class Search extends Component {

    handleListClick = (e) => {
        // console.log(e.target.id)
        this.props.updateSelectedListId(e.target.id)
        this.props.setCurrMarkerId(e.target.id)
    }

    render() {
        const restaurants = this.props.restaurants
        
        return ( 
            <div id='sidebar' style={{width: 256, height: '100%'}} >
                <div className='title'><h1>Menu</h1></div>
                <div id='search'>
                    <input id='input' placeholder='Search by name' onChange={(e) => this.props.handleInputChange(e.target.value.trim())} />
                </div>
                <div id='sidebarcontent'>
                    {/* <div className='title'><h1>Menu</h1></div>
                    <div id='search'>
                        <input placeholder='Search by name' onChange={(e) => this.props.handleInputChange(e.target.value.trim())} />
                    </div> */}
                    <ul>
                        {restaurants && restaurants.map(restaurant => 
                            <li
                                key={restaurant.id}
                                className={restaurant.id === this.props.currMarkerId? 'clicked' : undefined}
                                id={restaurant.id}
                                onClick={this.handleListClick}
                            >
                                {restaurant.name}
                            </li>
                        )}
                    </ul>
                    <img src='https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png' alt='restaurant icon'/>
                </div>
                <footer>
                        <p>Powered by Google Map and Foursquare</p>
                </footer>
            </div>
        )
    }
}
