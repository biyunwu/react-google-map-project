import React, { Component } from 'react';

export default class Search extends Component {
    render() {
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
                        <li>The Dutch</li>
                        <li>Spicy Village</li>
                        <li>Flaming Kitchen</li>
                        <li>Egg Shop</li>
                        <li>Wuchang</li>
                    </ul>
                </div>
            </div>
        )
    }
}
