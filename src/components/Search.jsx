import React, { Component } from 'react';
import GitHubIcon from '../GitHub.png'

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
                    <input
                        id='input'
                        placeholder='Search by name'
                        onChange={(e) => this.props.handleInputChange(e.target.value.trim())}
                        tabIndex='1'
                    />
                </div>
                <div id='sidebarcontent'>
                    <ul>
                        {restaurants && restaurants.map((restaurant, index) => 
                            <li
                                key={restaurant.id}
                                className={restaurant.id === this.props.currMarkerId? 'clicked' : undefined}
                                id={restaurant.id}
                                onClick={this.handleListClick}
                                tabIndex={index+1}
                            >
                                {restaurant.name}
                            </li>
                        )}
                    </ul>
                    <a 
                        href='https://github.com/biyunwu/react-neighbourhood-map'
                        tabIndex={restaurants.length+2}
                        target="_blank"
                    >
                        <img
                            id='git-icon' src={GitHubIcon}
                            alt="GitHub icon which is also a link to the repository of this project"
                        />
                    </a>
                </div>
                <footer>
                        <p>Powered by Google Map and Foursquare</p>
                </footer>
            </div>
        )
    }
}
