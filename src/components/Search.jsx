import React, { Component } from 'react';

export default class Search extends Component {

    render() {
        // console.log(this.props.restaurants)
        // const list = this.props.restaurants && this.props.restaurants.map(restaurant => <li key={restaurant.id}>{restaurant.name}</li>)
        // console.log(list);
        
        return (
            <div style={{width: 256, height: '100%'}} >
                <div id='sidebar'>
                    <div className='title'><h1>Menu</h1></div>
                    <div id='search'>
                        <input/>
                        <span></span>
                        <button>Search</button>
                    </div>
                    <ul>
                        {/* { this.props.restaurants.map(restaurant => 
                            <li key={restaurant.id}>{restaurant.name}</li>
                        )} */}
                        {/* {list} */}
                    </ul>
                    <img src='https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png' alt='restaurant icon'/>
                </div>
            </div>
        )
    }
}
